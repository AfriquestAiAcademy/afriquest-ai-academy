import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Book,
  Award,
  Trophy,
  MessageSquare,
  User,
  LogOut,
  Bell,
  Circle,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Home",
    icon: LayoutDashboard,
    url: "/dashboard/student",
  },
  {
    title: "My Classes",
    icon: BookOpen,
    url: "/dashboard/student/classes",
  },
  {
    title: "Assignments",
    icon: FileText,
    url: "/dashboard/student/assignments",
  },
  {
    title: "AI Tutors",
    icon: Book,
    url: "/dashboard/student/resources",
  },
  {
    title: "Achievements",
    icon: Award,
    url: "/dashboard/student/achievements",
  },
  {
    title: "Competitions",
    icon: Trophy,
    url: "/dashboard/student/competitions",
  },
  {
    title: "Community",
    icon: MessageSquare,
    url: "/dashboard/student/community",
  },
  {
    title: "Profile Settings",
    icon: User,
    url: "/dashboard/student/profile",
  },
];

// Mock data for demonstration - would come from backend in real implementation
const recentMessages = [
  { id: 1, name: "Sarah Johnson", online: true, unread: 2 },
  { id: 2, name: "David Chen", online: false, unread: 0 },
  { id: 3, name: "Maria Garcia", online: true, unread: 1 },
];

export function StudentSidebar() {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      return data;
    },
  });

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
    <Sidebar className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white">
      <SidebarContent className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">AfriQuest AI Academy</span>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>
                {profile?.full_name?.[0] || profile?.username?.[0] || "S"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">
                {profile?.full_name || profile?.username || "Student"}
              </span>
              <span className="text-xs text-muted-foreground">
                {profile?.education_level || "Student"}
              </span>
            </div>
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

        <SidebarSeparator />

        <SidebarGroup>
          <div className="px-3 py-2">
            <h3 className="text-sm font-medium mb-2">Direct Messages</h3>
            <SidebarMenu>
              {recentMessages.map((contact) => (
                <SidebarMenuItem key={contact.id}>
                  <SidebarMenuButton
                    onClick={() => navigate(`/messages/${contact.id}`)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Circle
                        className={`h-2 w-2 ${
                          contact.online ? "fill-green-500" : "fill-gray-400"
                        }`}
                      />
                      <span>{contact.name}</span>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground">
                        {contact.unread}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
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
