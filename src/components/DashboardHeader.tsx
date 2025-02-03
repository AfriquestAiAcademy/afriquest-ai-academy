import { GraduationCap } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
      <div className="flex items-center h-full px-6 ml-64">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">AfriQuest Academy</span>
        </div>
      </div>
    </header>
  );
}