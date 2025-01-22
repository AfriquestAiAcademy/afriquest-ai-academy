import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MessageSquare, UserPlus, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface StudyGroupsProps {
  searchQuery?: string;
}

export function StudyGroups({ searchQuery }: StudyGroupsProps) {
  const { data: groups, isLoading } = useQuery({
    queryKey: ['study-groups', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('study_groups')
        .select(`
          *,
          creator:profiles(full_name, avatar_url),
          members:study_group_members(member_id)
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  const joinGroupMutation = useMutation({
    mutationFn: async (groupId: string) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('study_group_members')
        .insert({
          group_id: groupId,
          member_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Successfully joined the group!');
    },
    onError: () => {
      toast.error('Failed to join the group');
    },
  });

  const inviteFriendMutation = useMutation({
    mutationFn: async ({ groupId, friendId }: { groupId: string; friendId: string }) => {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: friendId,
          type: 'group_invite',
          content: {
            groupId,
            message: `You've been invited to join a study group!`,
          },
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Invitation sent!');
    },
    onError: () => {
      toast.error('Failed to send invitation');
    },
  });

  if (isLoading) {
    return <div>Loading study groups...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Study Groups</h2>
        <Button>Create Group</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups?.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <Badge>{group.subject}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Created by {group.creator?.full_name || 'Anonymous'}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{group.description}</p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{group.members?.length || 0} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{group.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Active</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={() => joinGroupMutation.mutate(group.id)}
              >
                <UserPlus className="h-4 w-4" />
                Join Group
              </Button>
              <Button 
                variant="outline"
                size="icon"
                onClick={() => {
                  // For demo purposes - in real app, show friend selection dialog
                  toast.info('Friend selection dialog would appear here');
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}