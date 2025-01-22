import { Bell, MessageSquare, UserPlus, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function NotificationsPanel() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        toast.error('Failed to load notifications');
        throw error;
      }
      return data;
    },
  });

  const handleAcceptFriendRequest = async (notificationId: string, friendId: string) => {
    try {
      await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('user_id', friendId)
        .eq('friend_id', (await supabase.auth.getUser()).data.user?.id);

      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      toast.success('Friend request accepted!');
    } catch (error) {
      toast.error('Failed to accept friend request');
    }
  };

  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recent Notifications</h3>
          </div>
          <Badge variant="secondary">
            {notifications?.filter(n => !n.is_read).length || 0} new
          </Badge>
        </div>
        <div className="space-y-3">
          {notifications?.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg ${
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
                        onClick={() => handleAcceptFriendRequest(notification.id, notification.content.senderId)}
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
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.unread ? "bg-primary/5" : "bg-gray-50"
              }`}
            >
              <p className="text-sm font-medium">{message.from}</p>
              <p className="text-sm text-muted-foreground">{message.preview}</p>
              <span className="text-xs text-muted-foreground">{message.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
