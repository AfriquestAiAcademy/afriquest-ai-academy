import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TeacherSidebar } from "@/components/TeacherSidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ChatBot } from "@/components/ChatBot";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import CommunityHub from "./pages/community/CommunityHub";
import EventsPage from "./pages/events/EventsPage";
import CompetitionsPage from "./pages/competitions/CompetitionsPage";
import AchievementsPage from "./pages/achievements/AchievementsPage";

const queryClient = new QueryClient();

const getDashboardRoute = (role?: string) => {
  switch (role) {
    case 'student':
      return '/dashboard/student';
    case 'teacher':
      return '/dashboard/teacher';
    case 'parent':
      return '/dashboard/parent';
    case 'admin':
      return '/dashboard/admin';
    default:
      return '/auth';
  }
};

const isAdmin = (user: any) => user?.user_metadata?.role === 'admin';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  const getSidebar = () => {
    if (!user) return null;
    if (isAdmin(user)) return <AdminSidebar />;
    if (user.user_metadata?.role === 'teacher') return <TeacherSidebar />;
    if (user.user_metadata?.role === 'student') return <StudentSidebar />;
    return <AppSidebar />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              {user && <DashboardHeader />}
              {getSidebar()}
              <main className={`flex-1 ${user ? 'mt-16' : ''}`}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      user ? (
                        <Navigate
                          to={getDashboardRoute(user.user_metadata?.role)}
                          replace
                        />
                      ) : (
                        <Index />
                      )
                    }
                  />
                  <Route
                    path="/auth"
                    element={
                      user ? (
                        <Navigate
                          to={getDashboardRoute(user.user_metadata?.role)}
                          replace
                        />
                      ) : (
                        <Auth />
                      )
                    }
                  />
                  <Route
                    path="/dashboard/student"
                    element={
                      user?.user_metadata?.role === 'student' || isAdmin(user) ? (
                        <StudentDashboard />
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/dashboard/teacher"
                    element={
                      user?.user_metadata?.role === 'teacher' || isAdmin(user) ? (
                        <TeacherDashboard />
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/dashboard/admin"
                    element={
                      isAdmin(user) ? (
                        <AdminDashboard />
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/dashboard/parent"
                    element={
                      user?.user_metadata?.role === 'parent' || isAdmin(user) ? (
                        <div>Parent Dashboard (Coming Soon)</div>
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/courses"
                    element={
                      user ? (
                        <div>Courses (Coming Soon)</div>
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/achievements"
                    element={
                      user ? (
                        <AchievementsPage />
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/events"
                    element={
                      user ? (
                        <EventsPage />
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/competitions"
                    element={
                      user ? (
                        <CompetitionsPage />
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      user ? (
                        <div>Profile (Coming Soon)</div>
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/community"
                    element={
                      user ? (
                        <CommunityHub />
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                </Routes>
              </main>
            </div>
            <ChatBot />
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
