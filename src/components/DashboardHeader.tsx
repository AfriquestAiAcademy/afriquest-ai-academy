import { GraduationCap } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
      <div className="pl-64 flex items-center h-full"> {/* Added pl-64 for sidebar width */}
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">AfriQuest Academy</span>
        </div>
      </div>
    </header>
  );
}