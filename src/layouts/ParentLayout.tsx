import { Outlet } from "react-router-dom";
import { ParentSidebar } from "@/components/parent/ParentSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ChatBot } from "@/components/ChatBot";

export default function ParentLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardHeader />
        <ParentSidebar />
        <main className="flex-1 p-6 mt-16">
          <Outlet />
        </main>
        <ChatBot />
      </div>
    </SidebarProvider>
  );
}