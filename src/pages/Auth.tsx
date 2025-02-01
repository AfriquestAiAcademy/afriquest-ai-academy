import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForms from "@/components/auth/SignUpForms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState(true);

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
        <SignUpForms onToggleForm={() => setShowSignIn(true)} />
      )}
    </AuthLayout>
  );
};

export default Auth;