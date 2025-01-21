import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Download, Share2 } from "lucide-react";

interface ResourceHubProps {
  searchQuery?: string;
}

export function ResourceHub({ searchQuery }: ResourceHubProps) {
  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('resources')
        .select(`
          *,
          teacher:profiles(full_name)
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Educational Resources</h2>
        <Button>Share Resource</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources?.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {resource.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Shared by {resource.teacher?.full_name || 'Anonymous'}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{resource.description}</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}