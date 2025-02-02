import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface ProfileField {
  name: string;
  required: boolean;
  completed: boolean;
}

export function ProfileCompletion() {
  const navigate = useNavigate();

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

  const profileFields: ProfileField[] = [
    { name: "Full Name", required: true, completed: !!profile?.full_name },
    { name: "Username", required: true, completed: !!profile?.username },
    { name: "Age", required: true, completed: !!profile?.age },
    { name: "Grade Level", required: true, completed: !!profile?.grade_level },
    { name: "Subjects of Interest", required: true, completed: !!(profile?.subjects_of_interest?.length ?? 0) > 0 },
    { name: "Avatar", required: false, completed: !!profile?.avatar_url },
    { name: "Country", required: false, completed: !!profile?.country },
  ];

  const requiredFields = profileFields.filter(field => field.required);
  const completedRequiredFields = requiredFields.filter(field => field.completed);
  const requiredCompletion = Math.round((completedRequiredFields.length / requiredFields.length) * 100);

  const allFields = profileFields;
  const completedFields = allFields.filter(field => field.completed);
  const totalCompletion = Math.round((completedFields.length / allFields.length) * 100);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Profile Completion</h2>
          <p className="text-sm text-muted-foreground">
            Complete your profile to unlock all features
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/student/profile")}>
          Complete Profile
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Required Fields</span>
            <span className="text-sm text-muted-foreground">
              {completedRequiredFields.length} of {requiredFields.length} completed
            </span>
          </div>
          <Progress value={requiredCompletion} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Total Completion</span>
            <span className="text-sm text-muted-foreground">
              {completedFields.length} of {allFields.length} completed
            </span>
          </div>
          <Progress value={totalCompletion} className="h-2" />
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Remaining Fields:</h3>
          <ul className="space-y-1">
            {profileFields
              .filter(field => !field.completed)
              .map(field => (
                <li key={field.name} className="text-sm text-muted-foreground flex items-center">
                  • {field.name} {field.required && <span className="text-red-500 ml-1">*</span>}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}