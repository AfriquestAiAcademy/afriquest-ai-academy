import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Bot, Trophy } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-12 w-12 text-primary" />,
    title: "AI-Powered Tutors",
    description: "Personalized voice-based tutors for Math, Science, AI, and Robotics that make learning easier and engaging.",
  },
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: "Interactive Learning",
    description: "Fun, interactive lessons and quizzes that test your knowledge and help you learn better.",
  },
  {
    icon: <Bot className="h-12 w-12 text-primary" />,
    title: "Homework Assistant",
    description: "Upload your homework and textbooks for AI-powered support on assignments.",
  },
  {
    icon: <Trophy className="h-12 w-12 text-primary" />,
    title: "Competitions & Rewards",
    description: "Participate in exciting competitions across Africa and win awards!",
  },
];

const steps = [
  {
    number: "01",
    title: "Sign Up & Choose Subjects",
    description: "Sign up as a student, parent, or teacher and select your learning interests.",
  },
  {
    number: "02",
    title: "Learn with AI Tutors",
    description: "Engage with voice-based tutors in subjects you want to master.",
  },
  {
    number: "03",
    title: "Get Homework Help",
    description: "Upload your homework or textbook and get AI-powered support.",
  },
  {
    number: "04",
    title: "Join Competitions",
    description: "Join challenges, compete with others, and earn rewards.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <span className="inline-block py-1.5 px-3 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
                Welcome to AfriQuest AI Academy
              </span>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
                Empowering the Next Generation of African{" "}
                <span className="text-primary">Innovators</span> with AI & Robotics!
              </h1>
              <p className="mb-8 text-lg text-gray-600">
                Discover, Learn, and Grow with AI Tutors for Math, Science, Robotics, and more. Start your learning journey today!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="inline-flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <img
                className="w-full h-auto rounded-lg shadow-xl"
                src="/placeholder.svg"
                alt="Students learning with AI"
              />
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-lg text-gray-600">Select your role to get started with a personalized learning experience</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="w-full md:w-96 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">I'm a Student</h3>
              <p className="text-gray-600 mb-6">Ready to embark on an exciting learning journey with AI tutors?</p>
              <Button
                className="w-full"
                onClick={() => navigate("/auth?role=student")}
              >
                Sign Up to Start Learning
              </Button>
            </div>
            <div className="w-full md:w-96 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">I'm a Parent/Teacher</h3>
              <p className="text-gray-600 mb-6">Want to support and track your student's progress?</p>
              <Button
                className="w-full"
                onClick={() => navigate("/auth?role=parent")}
              >
                Sign Up to Support a Student
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600">Everything you need to succeed in your learning journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started with AfriQuest in four simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="absolute -top-4 left-6 text-4xl font-bold text-primary/20">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mb-2 mt-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">Hear from students and teachers using AfriQuest</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4">
                "AfriQuest helped me understand Math and Physics in a fun and easy way!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-600">Student, Grade 10</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4">
                "I can now track my child's progress and help them stay on top of their studies!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-gray-600">Parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8">Join thousands of students across Africa in their quest for knowledge</p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/auth")}
            className="inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;