import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Bell,
  Settings,
  HeadphonesIcon,
  LogOut,
  BarChart3,
  School,
  UserPlus,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Admin Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard/admin",
  },
  {
    title: "Student Dashboard",
    icon: School,
    url: "/dashboard/student",
  },
  {
    title: "Teacher Dashboard",
    icon: GraduationCap,
    url: "/dashboard/teacher",
  },
  {
    title: "Parent Dashboard",
    icon: User,
    url: "/dashboard/parent",
  },
  {
    title: "Manage Users",
    icon: Users,
    url: "/dashboard/admin/users",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/dashboard/admin/analytics",
  },
  {
    title: "Classes",
    icon: GraduationCap,
    url: "/dashboard/admin/classes",
  },
  {
    title: "Content",
    icon: BookOpen,
    url: "/dashboard/admin/content",
  },
  {
    title: "Announcements",
    icon: Bell,
    url: "/dashboard/admin/announcements",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/dashboard/admin/settings",
  },
  {
    title: "Support",
    icon: HeadphonesIcon,
    url: "/dashboard/admin/support",
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <Sidebar className="fixed left-0 top-0 h-screen">
      <SidebarContent className="mt-16 flex flex-col h-[calc(100vh-4rem)]">
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