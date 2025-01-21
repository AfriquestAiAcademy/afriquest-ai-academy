import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  progress: number;
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
      <Progress value={progress} className="h-2 mb-2" />
      <p className="text-sm text-gray-600">
        You've completed {progress}% of this week's learning goals!
      </p>
    </Card>
  );
}