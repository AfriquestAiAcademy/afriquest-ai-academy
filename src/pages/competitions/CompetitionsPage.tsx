import { useQuery } from "@tanstack/react-query";
import { Trophy, Calendar, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CompetitionsPage = () => {
  const { data: competitions, isLoading } = useQuery({
    queryKey: ["competitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*, profiles(full_name)")
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading competitions...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Competitions</h1>
        <Button>Create Competition</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions?.map((competition) => (
          <Card key={competition.id}>
            <CardHeader>
              <CardTitle>{competition.title}</CardTitle>
              <CardDescription>{competition.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>{competition.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(competition.start_date).toLocaleDateString()} -{" "}
                    {new Date(competition.end_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {competition.current_participants}/{competition.max_participants || "∞"} participants
                  </span>
                </div>
                <Button className="w-full mt-4">Join Competition</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompetitionsPage;