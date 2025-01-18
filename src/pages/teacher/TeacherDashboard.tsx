import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  BookOpen,
  Calendar,
  GraduationCap,
  Plus,
  Upload,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardStats {
  totalStudents: number;
  totalClasses: number;
  totalAssignments: number;
  totalResources: number;
  teacherName: string;
}

export default function TeacherDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalClasses: 0,
    totalAssignments: 0,
    totalResources: 0,
    teacherName: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) return;

        const [profileResponse, classesResponse, studentsResponse, assignmentsResponse, resourcesResponse] = await Promise.all([
          supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle(),
          supabase.from('classes').select('id').eq('teacher_id', user.id),
          supabase.from('class_enrollments').select('id, class_id').in('class_id', 
            (await supabase.from('classes').select('id').eq('teacher_id', user.id)).data?.map(c => c.id) || []
          ),
          supabase.from('assignments').select('id').eq('teacher_id', user.id),
          supabase.from('resources').select('id').eq('teacher_id', user.id),
        ]);

        setStats({
          teacherName: profileResponse.data?.full_name || "Teacher",
          totalClasses: classesResponse.data?.length || 0,
          totalStudents: studentsResponse.data?.length || 0,
          totalAssignments: assignmentsResponse.data?.length || 0,
          totalResources: resourcesResponse.data?.length || 0,
        });
      } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        toast({
          title: "Error fetching dashboard stats",
          description: error.message || "Please try again later",
          variant: "destructive",
        });
      }
    }

    fetchDashboardStats();
  }, [toast]);

  const quickActions = [
    {
      title: "Create New Class",
      icon: Plus,
      tooltip: "Start a new class for your students",
      onClick: () => toast({ title: "Coming soon!", description: "This feature will be available soon." }),
    },
    {
      title: "Upload Content",
      icon: Upload,
      tooltip: "Share learning materials with your students",
      onClick: () => toast({ title: "Coming soon!", description: "This feature will be available soon." }),
    },
    {
      title: "Schedule Lesson",
      icon: Calendar,
      tooltip: "Plan your upcoming lessons",
      onClick: () => toast({ title: "Coming soon!", description: "This feature will be available soon." }),
    },
    {
      title: "View Assignments",
      icon: BookOpen,
      tooltip: "Check student submissions and grade assignments",
      onClick: () => toast({ title: "Coming soon!", description: "This feature will be available soon." }),
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {stats.teacherName}!</h1>
        <p className="text-muted-foreground">Let's inspire the next generation of African innovators!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssignments}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResources}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TooltipProvider>
              {quickActions.map((action) => (
                <Tooltip key={action.title}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/5"
                      onClick={action.onClick}
                    >
                      <action.icon className="h-6 w-6" />
                      <span className="text-sm text-center">{action.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{action.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No recent activity to display
          </p>
        </CardContent>
      </Card>
    </div>
  );
}