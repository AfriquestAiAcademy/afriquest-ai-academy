import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  MessageSquare,
  User,
  LogOut,
  Bell,
  Circle,
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
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard/parent",
  },
  {
    title: "My Children",
    icon: Users,
    url: "/dashboard/parent/children",
  },
  {
    title: "Academic Progress",
    icon: GraduationCap,
    url: "/dashboard/parent/progress",
  },
  {
    title: "Schedule",
    icon: Calendar,
    url: "/dashboard/parent/schedule",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/dashboard/parent/messages",
  },
  {
    title: "Profile Settings",
    icon: User,
    url: "/dashboard/parent/profile",
  },
];

// Mock data for demonstration - would come from backend in real implementation
const recentMessages = [
  { id: 1, name: "Math Teacher", online: true, unread: 2 },
  { id: 2, name: "Science Teacher", online: false, unread: 0 },
  { id: 3, name: "Class Coordinator", online: true, unread: 1 },
];

export function ParentSidebar() {
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
      navigate("/auth");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <Sidebar className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white">
      <SidebarContent className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>
                  {profile?.full_name?.[0] || profile?.username?.[0] || "P"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">
                  {profile?.full_name || profile?.username || "Parent"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {profile?.role || "Parent"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-full hover:bg-accent">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground">
                  3
                </Badge>
              </button>
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
            <h3 className="text-sm font-medium mb-2">Recent Messages</h3>
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