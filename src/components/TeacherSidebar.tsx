import { BookOpen, GraduationCap, Home, BarChart, Upload, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
    title: "Reports",
    icon: BarChart,
    url: "/dashboard/teacher/reports",
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
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarContent className="mt-16 flex flex-col h-[calc(100vh-4rem)]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
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
              tooltip="Logout"
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