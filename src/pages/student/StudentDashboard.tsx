import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import {
  Users,
  FileText,
  Trophy,
  Award,
  PlusCircle,
  Upload,
  PlayCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDashboard() {
  const [progress, setProgress] = useState(70);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      return data;
    },
  });

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

  const isLoading = profileLoading || enrollmentsLoading || assignmentsLoading;

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
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-lg shadow-lg animate-fade-in">
        <h1 className="text-2xl font-bold">
          Welcome, {profile?.full_name || "Student"}! Ready to learn today?
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Classes Enrolled</h3>
              <p className="text-2xl font-bold">{enrollments?.length || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="font-semibold">Assignments Due</h3>
              <p className="text-2xl font-bold">{assignments?.length || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold">Competitions</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">Badges Earned</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Tracker */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
        <Progress value={progress} className="h-2 mb-2" />
        <p className="text-sm text-gray-600">
          You've completed {progress}% of this week's learning goals!
        </p>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
        >
          <PlusCircle className="h-6 w-6" />
          <span>Join a New Class</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
        >
          <Upload className="h-6 w-6" />
          <span>Submit an Assignment</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
        >
          <PlayCircle className="h-6 w-6" />
          <span>Start a Quiz</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
        >
          <Award className="h-6 w-6" />
          <span>View Achievements</span>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {assignments?.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-semibold">{submission.assignments?.title}</h3>
                <p className="text-sm text-gray-600">
                  Submitted on{" "}
                  {new Date(submission.submitted_at).toLocaleDateString()}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  submission.grade
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {submission.grade ? "Graded" : "Pending"}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}