import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
    activeClasses: 0
  });

  useEffect(() => {
    const getAdminProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user?.id)
        .single();
      
      if (profile) {
        setAdminName(profile.full_name);
      }
    };

    const getStats = async () => {
      // Get total counts from profiles table
      const { data: profileStats } = await supabase
        .from('profiles')
        .select('role')
        .not('role', 'is', null);

      if (profileStats) {
        const students = profileStats.filter(p => p.role === 'student').length;
        const teachers = profileStats.filter(p => p.role === 'teacher').length;
        const parents = profileStats.filter(p => p.role === 'parent').length;
      
        setStats({
          totalStudents: students,
          totalTeachers: teachers,
          totalParents: parents,
          activeClasses: 0 // We'll implement this later
        });
      }
    };

    getAdminProfile();
    getStats();
  }, []);

  const mockChartData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 300 },
    { name: 'Mar', users: 600 },
    { name: 'Apr', users: 800 },
    { name: 'May', users: 1000 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {adminName}!</h1>
        <p className="text-muted-foreground">You're shaping the future of education!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Total Students</h3>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Total Teachers</h3>
          <p className="text-2xl font-bold">{stats.totalTeachers}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Total Parents</h3>
          <p className="text-2xl font-bold">{stats.totalParents}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Active Classes</h3>
          <p className="text-2xl font-bold">{stats.activeClasses}</p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">User Growth</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#4cb1ff" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}