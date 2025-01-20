import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ThumbsUp } from "lucide-react";

export function CommunityDiscussions() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['community-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          author:profiles(full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading discussions...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Discussions</h2>
        <Button>New Post</Button>
      </div>
      <div className="grid gap-4">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                By {post.author?.full_name || 'Anonymous'}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{post.content}</p>
            </CardContent>
            <CardFooter className="flex gap-4 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="gap-2">
                <ThumbsUp className="w-4 h-4" />
                {post.likes_count || 0}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                {post.comments_count || 0}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}