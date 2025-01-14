import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center animate-fade-in">
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
          Welcome to Your Project
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Create Something
          <span className="block text-primary">Beautiful</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
          Start building your next great idea with this minimalist foundation.
          Clean, modern, and ready for your creative touch.
        </p>
        <div className="flex justify-center gap-4">
          <button className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button className="inline-flex items-center px-6 py-3 text-base font-medium text-primary bg-white border border-primary rounded-lg hover:bg-primary/5 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;