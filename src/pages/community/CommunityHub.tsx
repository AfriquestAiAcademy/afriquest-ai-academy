import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  BookOpen, 
  Trophy,
  Search,
  Bell
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommunityDiscussions } from "./CommunityDiscussions";
import { StudyGroups } from "./StudyGroups";
import { ResourceHub } from "./ResourceHub";
import { EventsTab } from "./EventsTab";
import { Leaderboard } from "./Leaderboard";

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Hub</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search community..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to our Learning Community</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5 gap-4">
              <TabsTrigger value="discussions" className="space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Discussions</span>
              </TabsTrigger>
              <TabsTrigger value="study-groups" className="space-x-2">
                <Users className="w-4 h-4" />
                <span>Study Groups</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Leaderboard</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussions">
              <CommunityDiscussions searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="study-groups">
              <StudyGroups searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="events">
              <EventsTab searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="resources">
              <ResourceHub searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="leaderboard">
              <Leaderboard />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}