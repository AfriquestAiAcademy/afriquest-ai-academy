import { Card } from "@/components/ui/card";

interface RecentActivityProps {
  assignments: any[];
}

export function RecentActivity({ assignments }: RecentActivityProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {assignments?.map((submission) => (
          <div
            key={submission.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <h3 className="font-semibold">{submission.assignments?.title}</h3>
              <p className="text-sm text-gray-600">
                Submitted on{" "}
                {new Date(submission.submitted_at).toLocaleDateString()}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                submission.grade
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {submission.grade ? "Graded" : "Pending"}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}