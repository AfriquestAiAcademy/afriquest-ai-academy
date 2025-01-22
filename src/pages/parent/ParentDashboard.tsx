import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Parent Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to AfriQuest AI Academy</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Monitor your child's progress and stay involved in their learning journey.</p>
        </CardContent>
      </Card>
    </div>
  );
}