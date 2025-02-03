import { Outlet } from "react-router-dom";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ChatBot } from "@/components/ChatBot";

export default function StudentLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardHeader />
        <StudentSidebar />
        <main className="flex-1 p-6 mt-16 ml-64">
          <Outlet />
        </main>
        <ChatBot />
      </div>
    </SidebarProvider>
  );
}