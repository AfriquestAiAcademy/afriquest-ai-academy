import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          navigate("/dashboard");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {role === "student"
              ? "Start Your Learning Journey"
              : "Support Your Student's Growth"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {role === "student"
              ? "Sign up to access AI tutors and interactive lessons"
              : "Sign up to track and support student progress"}
          </p>
        </div>

        <div className="mt-8">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            redirectTo={`${window.location.origin}/dashboard`}
            view="magic_link"
            showLinks={false}
            additionalData={{
              role: role,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;