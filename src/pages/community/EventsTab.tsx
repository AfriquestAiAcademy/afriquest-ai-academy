import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventsTabProps {
  searchQuery?: string;
}

export function EventsTab({ searchQuery }: EventsTabProps) {
  const { data: events, isLoading } = useQuery({
    queryKey: ['community-events', searchQuery],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          organizer:profiles(full_name)
        `)
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <Button>Create Event</Button>
      </div>

      <div className="grid gap-4">
        {events?.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Organized by {event.organizer?.full_name || 'Anonymous'}
                  </p>
                </div>
                <Badge variant={event.event_type === 'competition' ? 'default' : 'secondary'}>
                  {event.event_type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(event.start_date).toLocaleDateString()}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {event.current_participants}/{event.max_participants || '∞'} participants
                  </span>
                </div>
              </div>
              <Button className="w-full mt-4">Register Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}