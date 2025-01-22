import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { Toaster } from "sonner";
import AuthPage from "@/pages/auth/AuthPage";
import StudentDashboard from "@/pages/student/StudentDashboard";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import ParentDashboard from "@/pages/parent/ParentDashboard";
import StudentLayout from "@/layouts/StudentLayout";
import TeacherLayout from "@/layouts/TeacherLayout";
import ParentLayout from "@/layouts/ParentLayout";
import ProfileSettings from "@/pages/student/ProfileSettings";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>
          <Route path="/dashboard/teacher" element={<TeacherLayout />}>
            <Route index element={<TeacherDashboard />} />
          </Route>
          <Route path="/dashboard/parent" element={<ParentLayout />}>
            <Route index element={<ParentDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;