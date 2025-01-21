import { useQuery } from "@tanstack/react-query";
import { Award, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AchievementsPage = () => {
  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data: userAchievements, error: userError } = await supabase
        .from("user_achievements")
        .select(`
          *,
          achievements (*)
        `)
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (userError) throw userError;

      const { data: allAchievements, error: achievementsError } = await supabase
        .from("achievements")
        .select("*");

      if (achievementsError) throw achievementsError;

      return {
        earned: userAchievements,
        all: allAchievements,
      };
    },
  });

  if (isLoading) {
    return <div>Loading achievements...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Achievements</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements?.earned.map((userAchievement) => (
            <Card key={userAchievement.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  {userAchievement.achievements.title}
                </CardTitle>
                <CardDescription>
                  {userAchievement.achievements.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>{userAchievement.achievements.points} points</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Earned on {new Date(userAchievement.earned_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements?.all
            .filter(
              (achievement) =>
                !achievements.earned.some(
                  (earned) => earned.achievement_id === achievement.id
                )
            )
            .map((achievement) => (
              <Card key={achievement.id} className="opacity-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {achievement.title}
                  </CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{achievement.points} points</span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;