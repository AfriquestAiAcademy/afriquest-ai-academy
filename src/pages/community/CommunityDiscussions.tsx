import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ThumbsUp } from "lucide-react";

interface CommunityDiscussionsProps {
  searchQuery?: string;
}

export function CommunityDiscussions({ searchQuery }: CommunityDiscussionsProps) {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['community-posts', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          author:profiles!community_posts_author_id_fkey(full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      return data;
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading discussions...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading discussions. Please try again later.</div>;
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