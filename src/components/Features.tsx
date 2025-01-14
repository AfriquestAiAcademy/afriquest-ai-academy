import { Sparkles, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Beautiful Design",
    description: "Clean and minimal interface that puts your content first.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Optimized performance for the best user experience.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Reliable",
    description: "Built with the latest security best practices in mind.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Features
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Carefully crafted components to help you build faster
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300" />
              <div className="relative">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;