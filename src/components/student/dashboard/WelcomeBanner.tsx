import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function WelcomeBanner() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      return data;
    },
  });

  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-lg shadow-lg animate-fade-in">
      <h1 className="text-2xl font-bold">
        Welcome, {profile?.full_name || "Student"}! Ready to learn today?
      </h1>
    </div>
  );
}