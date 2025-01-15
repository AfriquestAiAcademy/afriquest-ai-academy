import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForms from "@/components/auth/SignUpForms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "student";

  useEffect(() => {
    if (searchParams.get("tab")) {
      setShowSignIn(false);
    }
  }, [searchParams]);

  return (
    <AuthLayout>
      {showSignIn ? (
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm onToggleForm={() => setShowSignIn(false)} />
          </CardContent>
        </Card>
      ) : (
        <>
          <SignUpForms defaultTab={defaultTab} onToggleForm={() => setShowSignIn(true)} />
        </>
      )}
    </AuthLayout>
  );
};

export default Auth;