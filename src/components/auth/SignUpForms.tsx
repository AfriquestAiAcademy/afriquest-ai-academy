import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import GradeLevelSelect from "./GradeLevelSelect";
import PasswordFields from "./PasswordFields";

// Form schemas
const studentSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  gradeLevel: z.string(),
  subjects: z.array(z.string()).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const teacherSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  subjectsTaught: z.array(z.string()).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const parentSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  childDetails: z.array(z.object({
    name: z.string(),
    age: z.number(),
    gradeLevel: z.string(),
  })).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignUpFormsProps {
  onToggleForm: () => void;
}

const SignUpForms = ({ onToggleForm }: SignUpFormsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Form instances
  const studentForm = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      gradeLevel: "",
      subjects: [],
    },
  });

  const teacherForm = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      subjectsTaught: [],
    },
  });

  const parentForm = useForm<z.infer<typeof parentSchema>>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      childDetails: [],
    },
  });

  const handleSignUp = async (
    values: z.infer<typeof studentSchema> | z.infer<typeof teacherSchema> | z.infer<typeof parentSchema>,
    role: 'student' | 'teacher' | 'parent'
  ) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
            role: role,
            ...('gradeLevel' in values && { gradeLevel: values.gradeLevel }),
            ...('subjects' in values && { subjects: values.subjects }),
            ...('subjectsTaught' in values && { subjectsTaught: values.subjectsTaught }),
            ...('childDetails' in values && { childDetails: values.childDetails }),
          },
        },
      });

      if (error) throw error;

      toast.success("Check your email to confirm your account!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="student" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="teacher">Teacher</TabsTrigger>
        <TabsTrigger value="parent">Parent</TabsTrigger>
      </TabsList>

      <TabsContent value="student">
        <Form {...studentForm}>
          <form onSubmit={studentForm.handleSubmit((values) => handleSignUp(values, 'student'))} className="space-y-4">
            <FormField
              control={studentForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordFields form={studentForm} />
            <FormField
              control={studentForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <GradeLevelSelect form={studentForm} />
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onToggleForm}>
                Sign In Instead
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="teacher">
        <Form {...teacherForm}>
          <form onSubmit={teacherForm.handleSubmit((values) => handleSignUp(values, 'teacher'))} className="space-y-4">
            <FormField
              control={teacherForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordFields form={teacherForm} />
            <FormField
              control={teacherForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onToggleForm}>
                Sign In Instead
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="parent">
        <Form {...parentForm}>
          <form onSubmit={parentForm.handleSubmit((values) => handleSignUp(values, 'parent'))} className="space-y-4">
            <FormField
              control={parentForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordFields form={parentForm} />
            <FormField
              control={parentForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onToggleForm}>
                Sign In Instead
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};

export default SignUpForms;