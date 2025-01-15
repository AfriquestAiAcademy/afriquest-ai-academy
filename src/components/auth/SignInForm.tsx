import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordFields from "./PasswordFields";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface SignInFormProps {
  onToggleForm: () => void;
}

const SignInForm = ({ onToggleForm }: SignInFormProps) => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          switch (error.message) {
            case "Invalid login credentials":
              return "Invalid email or password. Please check your credentials and try again.";
            case "Email not confirmed":
              return "Please verify your email address before signing in.";
            default:
              return error.message;
          }
        case 422:
          return "Invalid email or password format.";
        default:
          return "An error occurred during sign in. Please try again.";
      }
    }
    return error.message;
  };

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
        return;
      }

      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordFields control={form.control} />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Button variant="link" className="p-0" onClick={onToggleForm}>
          Sign up
        </Button>
      </p>
    </div>
  );
};

export default SignInForm;