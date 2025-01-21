import { PlusCircle, Upload, PlayCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Button
        variant="outline"
        className="h-auto py-4 flex flex-col items-center gap-2"
        onClick={() => navigate("/courses")}
      >
        <PlusCircle className="h-6 w-6" />
        <span>Join a New Class</span>
      </Button>

      <Button
        variant="outline"
        className="h-auto py-4 flex flex-col items-center gap-2"
        onClick={() => navigate("/assignments")}
      >
        <Upload className="h-6 w-6" />
        <span>Submit an Assignment</span>
      </Button>

      <Button
        variant="outline"
        className="h-auto py-4 flex flex-col items-center gap-2"
        onClick={() => navigate("/quizzes")}
      >
        <PlayCircle className="h-6 w-6" />
        <span>Start a Quiz</span>
      </Button>

      <Button
        variant="outline"
        className="h-auto py-4 flex flex-col items-center gap-2"
        onClick={() => navigate("/achievements")}
      >
        <Award className="h-6 w-6" />
        <span>View Achievements</span>
      </Button>
    </div>
  );
}