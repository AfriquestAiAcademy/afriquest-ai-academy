import { Bell, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - would come from backend in real implementation
const notifications = [
  {
    id: 1,
    type: "assignment",
    message: "New Math Assignment Due Tomorrow",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "message",
    message: "Sarah Johnson sent you a message",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "event",
    message: "Science Fair Registration Open",
    time: "1 day ago",
    unread: false,
  },
];

const messages = [
  {
    id: 1,
    from: "Sarah Johnson",
    preview: "About the group project...",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 2,
    from: "David Chen",
    preview: "Thanks for your help!",
    time: "3 hours ago",
    unread: true,
  },
];

export function NotificationsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recent Notifications</h3>
          </div>
          <Badge variant="secondary">3 new</Badge>
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg ${
                notification.unread ? "bg-primary/5" : "bg-gray-50"
              }`}
            >
              <p className="text-sm font-medium">{notification.message}</p>
              <span className="text-xs text-muted-foreground">
                {notification.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recent Messages</h3>
          </div>
          <Badge variant="secondary">2 unread</Badge>
        </div>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.unread ? "bg-primary/5" : "bg-gray-50"
              }`}
            >
              <p className="text-sm font-medium">{message.from}</p>
              <p className="text-sm text-muted-foreground">{message.preview}</p>
              <span className="text-xs text-muted-foreground">{message.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}