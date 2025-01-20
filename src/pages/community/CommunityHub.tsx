import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users } from "lucide-react";
import { CommunityDiscussions } from "./CommunityDiscussions";
import { StudyGroups } from "./StudyGroups";

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState("discussions");

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Community Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="discussions" className="space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Discussions</span>
              </TabsTrigger>
              <TabsTrigger value="study-groups" className="space-x-2">
                <Users className="w-4 h-4" />
                <span>Study Groups</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="discussions">
              <CommunityDiscussions />
            </TabsContent>
            <TabsContent value="study-groups">
              <StudyGroups />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}