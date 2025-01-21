import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Leaderboard() {
  const { data: topContributors, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          avatar_url,
          student_progress (
            points,
            level
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading leaderboard...</div>;
  }

  const getLeaderIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Star className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContributors?.map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8">
                      {getLeaderIcon(index)}
                    </div>
                    <Avatar>
                      <AvatarImage src={user.avatar_url || ''} />
                      <AvatarFallback>
                        {user.full_name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Level {user.student_progress?.[0]?.level || 1}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{user.student_progress?.[0]?.points || 0}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Active Study Groups</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add study group leaderboard content */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add achievements leaderboard content */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}