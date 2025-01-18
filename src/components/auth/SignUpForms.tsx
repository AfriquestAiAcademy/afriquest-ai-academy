import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import GradeLevelSelect from "./GradeLevelSelect";

const baseSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
});

const withPasswordValidation = (schema: z.ZodObject<any, any>) => {
  return schema.superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });
};

const adminSchema = withPasswordValidation(
  z.object({
    ...baseSchema.shape,
    // adminCode: z.string().min(1, "Admin code is required"), // Removed admin code validation
  })
);

const studentSchema = withPasswordValidation(
  z.object({
    ...baseSchema.shape,
    gradeLevel: z.string().min(1, "Please select a grade level"),
  })
);

const educatorSchema = withPasswordValidation(
  z.object({
    ...baseSchema.shape,
    subjectsTaught: z.string().min(1, "Please enter subjects taught"),
  })
);

const parentSchema = withPasswordValidation(
  z.object({
    ...baseSchema.shape,
    childDetails: z.string().min(10, "Please provide details about your child"),
  })
);

interface SignUpFormsProps {
  onToggleForm: () => void;
  defaultTab?: string;
}

const SignUpForms = ({ onToggleForm, defaultTab = "student" }: SignUpFormsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gradeLevel: "",
    },
  });

  const educatorForm = useForm({
    resolver: zodResolver(educatorSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      subjectsTaught: "",
    },
  });

  const parentForm = useForm({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      childDetails: "",
    },
  });

  const adminForm = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // adminCode: "", // Removed admin code from default values
    },
  });

  const handleSignUp = async (data: any, role: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: role, // This will be 'admin' when signing up through admin tab
            grade_level: data.gradeLevel,
            subjects_taught: data.subjectsTaught,
            child_details: data.childDetails,
          },
        },
      });

      if (error) throw error;

      toast.success("Sign up successful! Please check your email to verify your account.");
      
      // Redirect to appropriate dashboard based on role
      if (role === 'admin') {
        navigate('/dashboard/teacher');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue={defaultTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="educator">Educator</TabsTrigger>
        <TabsTrigger value="parent">Parent</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>

      <TabsContent value="student">
        <Card>
          <CardHeader>
            <CardTitle>Student Sign Up</CardTitle>
            <CardDescription>
              Create an account to start learning with AI-powered lessons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...studentForm}>
              <form
                onSubmit={studentForm.handleSubmit((data) =>
                  handleSignUp(data, "student")
                )}
                className="space-y-4"
              >
                <FormField
                  control={studentForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="gradeLevel"
                  render={({ field }) => (
                    <GradeLevelSelect control={studentForm.control} name="gradeLevel" />
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign Up as Student"}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onToggleForm}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="educator">
        <Card>
          <CardHeader>
            <CardTitle>Educator Sign Up</CardTitle>
            <CardDescription>
              Join as an educator to help students learn and grow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...educatorForm}>
              <form
                onSubmit={educatorForm.handleSubmit((data) =>
                  handleSignUp(data, "teacher")
                )}
                className="space-y-4"
              >
                <FormField
                  control={educatorForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={educatorForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={educatorForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={educatorForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={educatorForm.control}
                  name="subjectsTaught"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subjects Taught</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Math, Science, English"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign Up as Educator"}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onToggleForm}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="parent">
        <Card>
          <CardHeader>
            <CardTitle>Parent Sign Up</CardTitle>
            <CardDescription>
              Create an account to monitor and support your child's learning
              journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...parentForm}>
              <form
                onSubmit={parentForm.handleSubmit((data) =>
                  handleSignUp(data, "parent")
                )}
                className="space-y-4"
              >
                <FormField
                  control={parentForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={parentForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={parentForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={parentForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={parentForm.control}
                  name="childDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Child Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide your child's name, age, and grade level"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign Up as Parent"}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onToggleForm}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="admin">
        <Card>
          <CardHeader>
            <CardTitle>Admin Sign Up</CardTitle>
            <CardDescription>
              Create an administrator account with special privileges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...adminForm}>
              <form
                onSubmit={adminForm.handleSubmit((data) =>
                  handleSignUp(data, "admin")
                )}
                className="space-y-4"
              >
                <FormField
                  control={adminForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Removed adminCode field */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign Up as Admin"}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onToggleForm}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SignUpForms;
