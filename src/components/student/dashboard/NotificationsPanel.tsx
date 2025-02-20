
import { useEffect } from "react";
import { Bell, MessageSquare, UserPlus, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NotificationContent {
  senderName?: string;
  senderId?: string;
  message?: string;
}

interface Notification {
  id: string;
  type: 'friend_request' | 'group_invite' | 'system';
  content: NotificationContent;
  is_read: boolean;
  created_at: string;
}

interface Message {
  id: string;
  from: string;
  preview: string;
  time: string;
  unread: boolean;
}

export function NotificationsPanel() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Subscribe to real-time notifications
    const channel = supabase
      .channel('notifications_panel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        () => {
          // Refetch notifications when changes occur
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        toast.error('Failed to load notifications');
        throw error;
      }
      return data as Notification[];
    },
  });

  const handleAcceptFriendRequest = async (notificationId: string, friendId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('user_id', friendId)
        .eq('friend_id', user.id);

      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Friend request accepted!');
    } catch (error) {
      toast.error('Failed to accept friend request');
    }
  };

  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recent Notifications</h3>
          </div>
          <Badge variant="secondary" className="animate-in fade-in">
            {unreadCount} new
          </Badge>
        </div>
        <div className="space-y-3">
          {notifications?.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg transition-colors ${
                !notification.is_read ? "bg-primary/5" : "bg-gray-50"
              }`}
            >
              {notification.type === 'friend_request' && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">
                      {notification.content.senderName} sent you a friend request
                    </p>
                  </div>
                  {!notification.is_read && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptFriendRequest(notification.id, notification.content.senderId || '')}
                      >
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              )}
              {notification.type === 'group_invite' && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">
                    {notification.content.message}
                  </p>
                </div>
              )}
              <span className="text-xs text-muted-foreground block mt-1">
                {new Date(notification.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recent Messages</h3>
          </div>
          <Badge variant="secondary">2 unread</Badge>
        </div>
        <div className="space-y-3">
          {/* Chat messages will be implemented in the next phase */}
          <p className="text-sm text-muted-foreground text-center py-4">
            Chat functionality coming soon!
          </p>
        </div>
      </Card>
    </div>
  );
}
