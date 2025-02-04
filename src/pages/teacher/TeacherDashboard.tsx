import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <main className="pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Educator Dashboard Coming Soon
          </h1>
          <p className="text-lg text-gray-600">
            We're building powerful tools to help you create engaging learning experiences.
            Check back soon!
          </p>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="mt-8"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </main>
    </div>
  );
}