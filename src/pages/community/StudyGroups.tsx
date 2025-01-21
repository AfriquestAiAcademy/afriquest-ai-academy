import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MessageSquare, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
          creator:profiles(full_name, avatar_url)
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
                  <span>{group.member_count} members</span>
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
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="w-full gap-2">
                <UserPlus className="h-4 w-4" />
                Join Group
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}