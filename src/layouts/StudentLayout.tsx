import { Outlet } from "react-router-dom";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ChatBot } from "@/components/ChatBot";

export default function StudentLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardHeader />
        <StudentSidebar />
        <main className="flex-1 overflow-y-auto p-6 mt-16 ml-64">
          <Outlet />
        </main>
        <ChatBot />
      </div>
    </SidebarProvider>
  );
}