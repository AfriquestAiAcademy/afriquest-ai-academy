import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const studentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gradeLevel: z.string().min(1, "Please select a grade level"),
});

const educatorSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  subjectsTaught: z.string().min(1, "Please enter subjects taught"),
});

const parentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  childDetails: z.string().min(10, "Please provide details about your child"),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const role = session.user.user_metadata.role;
        navigate(`/dashboard/${role}`);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const studentForm = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      gradeLevel: "",
    },
  });

  const educatorForm = useForm({
    resolver: zodResolver(educatorSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      subjectsTaught: "",
    },
  });

  const parentForm = useForm({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      childDetails: "",
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
            role: role,
            grade_level: data.gradeLevel,
            subjects_taught: data.subjectsTaught,
            child_details: data.childDetails,
          },
        },
      });

      if (error) throw error;

      toast.success("Sign up successful! Please check your email to verify your account.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join AfriQuest AI Academy
            </h1>
            <p className="text-gray-600">
              Start your learning journey today
            </p>
          </div>

          <Tabs defaultValue="student" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="educator">Educator</TabsTrigger>
              <TabsTrigger value="parent">Parent</TabsTrigger>
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
                    <form onSubmit={studentForm.handleSubmit((data) => handleSignUp(data, 'student'))} className="space-y-4">
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
                              <Input type="email" placeholder="john@example.com" {...field} />
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
                        name="gradeLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Grade Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your grade" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((grade) => (
                                  <SelectItem key={grade} value={grade}>
                                    {grade} Grade
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing up..." : "Sign Up as Student"}
                      </Button>
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
                    <form onSubmit={educatorForm.handleSubmit((data) => handleSignUp(data, 'teacher'))} className="space-y-4">
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
                              <Input type="email" placeholder="john@example.com" {...field} />
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
                        name="subjectsTaught"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subjects Taught</FormLabel>
                            <FormControl>
                              <Input placeholder="Math, Science, English" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing up..." : "Sign Up as Educator"}
                      </Button>
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
                    Create an account to monitor and support your child's learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...parentForm}>
                    <form onSubmit={parentForm.handleSubmit((data) => handleSignUp(data, 'parent'))} className="space-y-4">
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
                              <Input type="email" placeholder="john@example.com" {...field} />
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
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;