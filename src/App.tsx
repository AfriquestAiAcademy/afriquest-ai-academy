import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider defaultOpen>
            <div className="flex min-h-screen w-full">
              {user && <AppSidebar />}
              <main className="flex-1">
                {user && <SidebarTrigger className="fixed top-4 left-4 z-50" />}
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route
                    path="/auth"
                    element={user ? <Navigate to="/dashboard" replace /> : <Auth />}
                  />
                  <Route
                    path="/dashboard"
                    element={user ? <div>Dashboard (Coming Soon)</div> : <Navigate to="/auth" replace />}
                  />
                  <Route
                    path="/courses"
                    element={user ? <div>Courses (Coming Soon)</div> : <Navigate to="/auth" replace />}
                  />
                  <Route
                    path="/achievements"
                    element={user ? <div>Achievements (Coming Soon)</div> : <Navigate to="/auth" replace />}
                  />
                  <Route
                    path="/profile"
                    element={user ? <div>Profile (Coming Soon)</div> : <Navigate to="/auth" replace />}
                  />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;