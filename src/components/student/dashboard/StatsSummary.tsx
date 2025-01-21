import { Users, FileText, Trophy, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsSummaryProps {
  enrollments: any[];
  assignments: any[];
}

export function StatsSummary({ enrollments, assignments }: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold">Classes Enrolled</h3>
            <p className="text-2xl font-bold">{enrollments?.length || 0}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-yellow-500" />
          <div>
            <h3 className="font-semibold">Assignments Due</h3>
            <p className="text-2xl font-bold">{assignments?.length || 0}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-purple-500" />
          <div>
            <h3 className="font-semibold">Competitions</h3>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-green-500" />
          <div>
            <h3 className="font-semibold">Badges Earned</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </Card>
    </div>
  );
}