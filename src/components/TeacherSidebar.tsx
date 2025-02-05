import { Home, BookOpen, GraduationCap, Upload, User, LogOut, MessageSquare, Calendar, Trophy, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard/teacher",
  },
  {
    title: "My Classes",
    icon: GraduationCap,
    url: "/dashboard/teacher/classes",
  },
  {
    title: "Content Library",
    icon: Upload,
    url: "/dashboard/teacher/content",
  },
  {
    title: "Assignments",
    icon: BookOpen,
    url: "/dashboard/teacher/assignments",
  },
  {
    title: "Events",
    icon: Calendar,
    url: "/events",
  },
  {
    title: "Competitions",
    icon: Trophy,
    url: "/competitions",
  },
  {
    title: "Achievements",
    icon: Award,
    url: "/achievements",
  },
  {
    title: "Community",
    icon: MessageSquare,
    url: "/community",
  },
  {
    title: "Profile",
    icon: User,
    url: "/profile",
  },
];

export function TeacherSidebar() {
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
    <Sidebar className="fixed left-0 top-0 h-screen">
      <SidebarContent className="mt-16 flex flex-col h-[calc(100vh-4rem)]">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">AfriQuest AI Academy</span>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className="w-full flex items-center gap-3 px-3 py-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}