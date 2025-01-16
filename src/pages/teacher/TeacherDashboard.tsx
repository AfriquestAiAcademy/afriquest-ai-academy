import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, BookOpen, GraduationCap, Users } from "lucide-react";

interface DashboardStats {
  totalStudents: number;
  totalClasses: number;
  totalAssignments: number;
  totalResources: number;
}

export default function TeacherDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalClasses: 0,
    totalAssignments: 0,
    totalResources: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) return;

        const [classesResponse, studentsResponse, assignmentsResponse, resourcesResponse] = await Promise.all([
          supabase.from('classes').select('id').eq('teacher_id', user.id),
          supabase.from('class_enrollments').select('id, class_id').in('class_id', 
            (await supabase.from('classes').select('id').eq('teacher_id', user.id)).data?.map(c => c.id) || []
          ),
          supabase.from('assignments').select('id').eq('teacher_id', user.id),
          supabase.from('resources').select('id').eq('teacher_id', user.id),
        ]);

        setStats({
          totalClasses: classesResponse.data?.length || 0,
          totalStudents: studentsResponse.data?.length || 0,
          totalAssignments: assignmentsResponse.data?.length || 0,
          totalResources: resourcesResponse.data?.length || 0,
        });
      } catch (error) {
        toast({
          title: "Error fetching dashboard stats",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    }

    fetchDashboardStats();
  }, [toast]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">Here's an overview of your teaching activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssignments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResources}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}