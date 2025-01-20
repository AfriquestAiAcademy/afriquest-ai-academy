import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export function StudyGroups() {
  const { data: groups, isLoading } = useQuery({
    queryKey: ['study-groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_groups')
        .select(`
          *,
          creator:profiles(full_name)
        `)
        .order('created_at', { ascending: false });
      
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
      <div className="grid gap-4">
        {groups?.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="text-lg">{group.name}</CardTitle>
              <div className="text-sm text-muted-foreground">
                Created by {group.creator?.full_name || 'Anonymous'}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{group.description}</p>
              <div className="mt-2 text-sm text-muted-foreground">
                Subject: {group.subject}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {group.member_count} / {group.max_members} members
              </div>
              <Button>Join Group</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}