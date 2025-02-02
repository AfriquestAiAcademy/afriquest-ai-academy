import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Video, MessageSquare } from "lucide-react";

interface StudyRoom {
  id: string;
  name: string;
  subject: string;
  participants: number;
  is_active: boolean;
  host: {
    full_name: string;
    avatar_url: string;
  };
}

export function LiveStudy() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['study-rooms', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('study_groups')
        .select(`
          *,
          host:profiles(full_name, avatar_url)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as StudyRoom[];
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Study Rooms</h2>
        <Button>Create Room</Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search study rooms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms?.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{room.name}</span>
                <Button variant="outline" size="sm">
                  Join Room
                </Button>
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {room.participants} participants
                </span>
                <span>{room.subject}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span className="text-sm">Live Session</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">Chat Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}