import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    full_name: string;
    avatar_url: string;
  };
  created_at: string;
  comments_count: number;
  likes_count: number;
}

export function Forums() {
  const [activeSubject, setActiveSubject] = useState("all");

  const { data: posts, isLoading } = useQuery({
    queryKey: ['forum-posts', activeSubject],
    queryFn: async () => {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          author:profiles(full_name, avatar_url)
        `)
        .eq('category', 'forum')
        .order('created_at', { ascending: false });

      if (activeSubject !== 'all') {
        query = query.eq('category', activeSubject);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ForumPost[];
    },
  });

  const subjects = [
    "Mathematics",
    "Science",
    "Literature",
    "History",
    "Computer Science",
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Discussion Forums</h2>
        <Button>Start New Discussion</Button>
      </div>

      <Tabs value={activeSubject} onValueChange={setActiveSubject}>
        <TabsList className="flex space-x-2 overflow-x-auto">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          {subjects.map((subject) => (
            <TabsTrigger key={subject} value={subject}>
              {subject}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeSubject} className="mt-4">
          {isLoading ? (
            <div>Loading discussions...</div>
          ) : (
            <div className="grid gap-4">
              {posts?.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{post.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Posted by {post.author.full_name}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {post.comments_count}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{post.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}