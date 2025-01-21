import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { WelcomeBanner } from "@/components/student/dashboard/WelcomeBanner";
import { StatsSummary } from "@/components/student/dashboard/StatsSummary";
import { ProgressTracker } from "@/components/student/dashboard/ProgressTracker";
import { QuickActions } from "@/components/student/dashboard/QuickActions";
import { RecentActivity } from "@/components/student/dashboard/RecentActivity";

export default function StudentDashboard() {
  const [progress, setProgress] = useState(70);

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data } = await supabase
        .from("class_enrollments")
        .select("*, classes(*)")
        .eq("student_id", user.id);

      return data || [];
    },
  });

  const { data: assignments, isLoading: assignmentsLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data } = await supabase
        .from("assignment_submissions")
        .select("*, assignments(*)")
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false })
        .limit(5);

      return data || [];
    },
  });

  const isLoading = enrollmentsLoading || assignmentsLoading;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <WelcomeBanner />
      <StatsSummary enrollments={enrollments} assignments={assignments} />
      <ProgressTracker progress={progress} />
      <QuickActions />
      <RecentActivity assignments={assignments} />
    </div>
  );
}