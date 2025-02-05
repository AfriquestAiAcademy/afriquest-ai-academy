import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, BookOpen, Bot, Trophy, School, Users, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";

const features = [
  {
    icon: <Brain className="h-12 w-12 text-primary" />,
    title: "For Students",
    description: "Personalized AI tutors, gamified lessons, and homework assistance with progress tracking.",
  },
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: "For Educators",
    description: "AI lesson planning, classroom management, and access to shared resources.",
  },
  {
    icon: <Bot className="h-12 w-12 text-primary" />,
    title: "AI-Powered Learning",
    description: "Advanced tutoring system that adapts to each student's learning style.",
  },
  {
    icon: <Trophy className="h-12 w-12 text-primary" />,
    title: "Awards & Progress",
    description: "Track achievements, earn badges, and compete in Pan-African challenges.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create an Account",
    description: "Sign up as a student, educator, or parent in just a few clicks.",
  },
  {
    number: "02",
    title: "Choose Your Role",
    description: "Access features tailored to your specific needs.",
  },
  {
    number: "03",
    title: "Access Features",
    description: "Start learning or managing with our AI-powered tools.",
  },
  {
    number: "04",
    title: "Track Progress",
    description: "Monitor achievements and growth in real-time.",
  },
];

const plans = [
  {
    name: "Basic",
    price: "$4.99/month",
    features: [
      "Limited AI tutoring sessions",
      "Basic progress tracking",
      "Community forums access",
      "Join public study groups",
      "7 days free trial"
    ],
  },
  {
    name: "Premium",
    price: "$9.99/month",
    features: [
      "Unlimited AI tutoring",
      "Advanced progress tracking",
      "Create private study groups",
      "Personalized learning paths",
      "Premium learning resources",
      "Achievement system",
      "Save chat history",
      "7 days free trial"
    ],
  },
  {
    name: "Family",
    price: "$24.99/month",
    features: [
      "Up to 4 student accounts",
      "Parent dashboard",
      "Family progress reports",
      "Shared resources library",
      "Group tutoring sessions",
      "Priority support",
      "Custom learning paths",
      "7 days free trial"
    ],
  },
];

const specialOffer = {
  name: "Student Success Pack",
  price: "$99",
  description: "One-time purchase, lifetime value",
  features: [
    "6 months Premium access",
    "Study skills masterclass",
    "Exam preparation toolkit",
    "3 one-on-one tutoring sessions",
    "Lifetime access to recorded workshops",
    "College application guidance"
  ],
};

const Index = () => {
  const navigate = useNavigate();

  const handlePlanSelection = async (planName: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        localStorage.setItem('selectedPlan', planName);
        navigate("/auth");
        return;
      }

      let secretName = '';
      switch (planName.toLowerCase()) {
        case 'premium':
          secretName = 'PREMIUM_PAYMENT_LINK';
          break;
        case 'family':
          secretName = 'FAMILY_PAYMENT_LINK';
          break;
        case 'educator':
          secretName = 'EDUCATOR_PAYMENT_LINK';
          break;
        case 'classroom':
          secretName = 'CLASSROOM_PAYMENT_LINK';
          break;
        case 'school':
          secretName = 'SCHOOL_PAYMENT_LINK';
          break;
        default:
          console.error('Invalid plan selected');
          return;
      }

      const { data, error } = await supabase.functions.invoke('get-secret', {
        body: { name: secretName }
      });

      if (error) {
        console.error('Error getting payment link:', error);
        return;
      }

      if (data?.secret) {
        window.location.href = data.secret;
      } else {
        console.error('Payment link not found');
      }
    } catch (error) {
      console.error('Error in plan selection:', error);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-white w-full">
        <Navigation />
        
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold">
                Revolutionizing Education Across{" "}
                <span className="text-primary">Africa</span>
              </h1>
              <p className="mb-8 text-lg text-gray-600">
                Empowering students, educators, and parents with cutting-edge AI tools for a brighter future in education.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth?tab=student")}
                  className="inline-flex items-center"
                >
                  Sign Up as Student
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/auth?tab=educator")}
                >
                  Sign Up as Educator
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/auth?tab=parent")}
                >
                  Sign Up as Parent
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <img
                className="w-full h-auto rounded-lg shadow-xl"
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                alt="Student learning with AI"
              />
            </div>
          </div>
        </div>
      </section>
        
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">Tailored solutions for every role in education</p>
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
      <section className="py-20">
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
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">Hear from our community members</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4">
                "AfriQuest has transformed how I learn mathematics. The AI tutor makes complex concepts easy to understand!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-sm text-gray-600">Student, Grade 10</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <p className="text-gray-600 mb-4">
                "As an educator, I've seen remarkable improvement in student engagement and performance."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Dr. James K.</h4>
                  <p className="text-sm text-gray-600">High School Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      {/* Individual & Family Plans */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600">Start your learning journey today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`flex flex-col p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full ${
                  index === 1 ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">{plan.price}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="w-full mt-6"
                  variant={index === 1 ? "default" : "outline"}
                  onClick={() => handlePlanSelection(plan.name)}
                >
                  {index === 0 ? 'Get Started' : 'Subscribe Now'}
                </Button>
              </div>
            ))}
          </div>

          {/* Special Offer */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-secondary/20 rounded-xl p-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">{specialOffer.name}</h3>
                  <p className="text-gray-600 mb-4">{specialOffer.description}</p>
                  <ul className="space-y-2">
                    {specialOffer.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-3xl font-bold text-primary mb-2">{specialOffer.price}</p>
                  <p className="text-sm text-gray-600 mb-4">One-time payment</p>
                  <Button
                    size="lg"
                    onClick={() => handlePlanSelection('success-pack')}
                  >
                    Get Success Pack
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      <section className="py-20 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Education?</h2>
          <p className="text-xl mb-8">Join thousands of students and educators across Africa</p>
          <Button
            size="lg"
            variant="default"
            onClick={() => navigate("/auth")}
            className="inline-flex items-center bg-white text-primary hover:bg-gray-100"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Index;
