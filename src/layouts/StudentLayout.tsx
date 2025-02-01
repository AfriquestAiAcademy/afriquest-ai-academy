import { Outlet } from "react-router-dom";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function StudentLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <StudentSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}