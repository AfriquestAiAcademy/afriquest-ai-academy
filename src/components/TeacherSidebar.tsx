import { BookOpen, GraduationCap, Home, BarChart, Upload, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => navigate(item.url)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}