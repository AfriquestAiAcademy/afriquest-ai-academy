import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "@/pages/Index";
import Auth from "@/pages/auth/Auth";
import StudentDashboard from "@/pages/student/StudentDashboard";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import ParentDashboard from "@/pages/parent/ParentDashboard";
import StudentLayout from "@/layouts/StudentLayout";
import TeacherLayout from "@/layouts/TeacherLayout";
import ParentLayout from "@/layouts/ParentLayout";
import ProfileSettings from "@/pages/student/ProfileSettings";
import CommunityHub from "@/pages/community/CommunityHub";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route
            path="/auth"
            element={!session ? <Auth /> : <Navigate to="/dashboard" replace />}
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              session ? (
                <Navigate
                  to={`/dashboard/${
                    session.user?.user_metadata?.role || "student"
                  }`}
                  replace
                />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/dashboard/student"
            element={
              session ? <StudentLayout /> : <Navigate to="/auth" replace />
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="community" element={<CommunityHub />} />
          </Route>

          <Route
            path="/dashboard/teacher"
            element={
              session ? <TeacherLayout /> : <Navigate to="/auth" replace />
            }
          >
            <Route index element={<TeacherDashboard />} />
          </Route>

          <Route
            path="/dashboard/parent"
            element={
              session ? <ParentLayout /> : <Navigate to="/auth" replace />
            }
          >
            <Route index element={<ParentDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;