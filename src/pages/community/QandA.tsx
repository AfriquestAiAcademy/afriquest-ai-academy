import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Award } from "lucide-react";

interface Question {
  id: string;
  title: string;
  content: string;
  subject: string;
  votes: number;
  answers_count: number;
  is_solved: boolean;
  author: {
    full_name: string;
    avatar_url: string;
  };
}

export function QandA() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          author:profiles(full_name, avatar_url)
        `)
        .eq('category', 'question')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Question[];
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Q&A Forum</h2>
        <Button>Ask Question</Button>
      </div>

      <Input
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-lg"
      />

      <div className="grid gap-4">
        {questions?.map((question) => (
          <Card key={question.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {question.title}
                    {question.is_solved && (
                      <Badge variant="success" className="bg-green-500">
                        <Award className="h-3 w-3 mr-1" />
                        Solved
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Asked by {question.author.full_name}
                  </p>
                </div>
                <Badge>{question.subject}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{question.content}</p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {question.votes}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {question.answers_count} answers
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}