import { Link } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center px-4">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mr-4">
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">AfriQuest Academy</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-16 mt-16">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join AfriQuest AI Academy
            </h1>
            <p className="text-gray-600">Start your learning journey today</p>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;