import { Outlet } from "react-router-dom";
import TeacherSidebar from "@/components/TeacherSidebar";

export default function TeacherLayout() {
  return (
    <div className="flex h-screen">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}