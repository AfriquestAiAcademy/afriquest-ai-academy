import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  HelpCircle,
  Video,
  GraduationCap,
  BarChart,
  Search,
  Bell,
  PenSquare,
  MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Forums } from "./Forums";
import { LiveStudy } from "./LiveStudy";
import { QandA } from "./QandA";
import { StudyGroups } from "./StudyGroups";
import { ResourceHub } from "./ResourceHub";
import { Leaderboard } from "./Leaderboard";
import { ChatRooms } from "./ChatRooms";
import { Polls } from "./Polls";

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState("chat");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
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

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to our Learning Community</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-8 gap-4">
              <TabsTrigger value="chat" className="space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="forums" className="space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Forums</span>
              </TabsTrigger>
              <TabsTrigger value="live-study" className="space-x-2">
                <Video className="w-4 h-4" />
                <span>Live Study</span>
              </TabsTrigger>
              <TabsTrigger value="qanda" className="space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>Q&A</span>
              </TabsTrigger>
              <TabsTrigger value="study-groups" className="space-x-2">
                <Users className="w-4 h-4" />
                <span>Study Groups</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="polls" className="space-x-2">
                <PenSquare className="w-4 h-4" />
                <span>Polls</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="space-x-2">
                <BarChart className="w-4 h-4" />
                <span>Leaderboard</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <ChatRooms />
            </TabsContent>
            <TabsContent value="forums">
              <Forums />
            </TabsContent>
            <TabsContent value="live-study">
              <LiveStudy />
            </TabsContent>
            <TabsContent value="qanda">
              <QandA />
            </TabsContent>
            <TabsContent value="study-groups">
              <StudyGroups searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="resources">
              <ResourceHub searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="polls">
              <Polls />
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