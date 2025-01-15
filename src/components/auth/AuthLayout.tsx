import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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