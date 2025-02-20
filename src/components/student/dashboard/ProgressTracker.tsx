
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trophy } from "lucide-react";

interface ProgressTrackerProps {
  progress: number;
}

export function ProgressTracker({ progress: initialProgress }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    // Subscribe to real-time progress updates
    const channel = supabase
      .channel('student_progress')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'student_progress',
          filter: `student_id=eq.${supabase.auth.getUser().then(({ data }) => data.user?.id)}`
        },
        (payload) => {
          console.log('Progress update received:', payload);
          setProgress(payload.new.points || 0);
          setLevel(payload.new.level || 1);
          
          // Show toast for level up
          if (payload.new.level > (payload.old.level || 1)) {
            toast.success(`Congratulations! You've reached level ${payload.new.level}! 🎉`);
          }
        }
      )
      .subscribe();

    // Fetch initial progress data
    const fetchProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('student_progress')
        .select('points, level')
        .eq('student_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching progress:', error);
        return;
      }

      if (data) {
        setProgress(data.points || 0);
        setLevel(data.level || 1);
      }
    };

    fetchProgress();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Weekly Progress</h2>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-medium">Level {level}</span>
        </div>
      </div>
      <Progress value={progress} className="h-2 mb-2" />
      <p className="text-sm text-gray-600">
        You've completed {progress}% of this week's learning goals!
      </p>
      <div className="mt-4 text-xs text-gray-500">
        Next level: {progress >= 100 ? "Max level reached!" : `${100 - progress}% to go`}
      </div>
    </Card>
  );
}
