import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

interface ChatRoom {
  id: string;
  name: string;
  type: string;
  created_by: string;
  is_private: boolean;
}

export function ChatRooms() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: chatRooms, isLoading: isLoadingRooms } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ChatRoom[];
    },
  });

  useEffect(() => {
    if (selectedRoom) {
      // Subscribe to new messages
      const channel = supabase
        .channel('chat-messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `room_id=eq.${selectedRoom}`,
          },
          (payload) => {
            setMessages((current) => [...current, payload.new as Message]);
          }
        )
        .subscribe();

      // Load existing messages
      loadMessages();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedRoom]);

  const loadMessages = async () => {
    if (!selectedRoom) return;

    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .eq('room_id', selectedRoom)
      .order('created_at', { ascending: true });

    if (error) {
      toast.error("Failed to load messages");
      return;
    }

    setMessages(data);
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) return;

    const { error } = await supabase
      .from('chat_rooms')
      .insert({
        name: newRoomName.trim(),
        type: 'general',
        created_by: (await supabase.auth.getUser()).data.user?.id,
      });

    if (error) {
      toast.error("Failed to create chat room");
      return;
    }

    setNewRoomName("");
    toast.success("Chat room created successfully");
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedRoom) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        content: message.trim(),
        room_id: selectedRoom,
        sender_id: (await supabase.auth.getUser()).data.user?.id,
      });

    if (error) {
      toast.error("Failed to send message");
      return;
    }

    setMessage("");
  };

  if (isLoadingRooms) {
    return <div>Loading chat rooms...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4 h-[600px]">
      <div className="col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Chat Rooms</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Chat Room</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Room name"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
                <Button onClick={createRoom}>Create Room</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {chatRooms?.map((room) => (
              <Card
                key={room.id}
                className={`p-3 cursor-pointer hover:bg-accent ${
                  selectedRoom === room.id ? "bg-accent" : ""
                }`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <h4 className="font-medium">{room.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {room.type} room
                </p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="col-span-9 space-y-4">
        {selectedRoom ? (
          <>
            <ScrollArea className="h-[500px] p-4 border rounded-lg">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender_id === (supabase.auth.getUser()).data.user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender_id === (supabase.auth.getUser()).data.user?.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm font-medium">
                        {msg.profiles?.full_name || "Anonymous"}
                      </p>
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a chat room to start messaging
          </div>
        )}
      </div>
    </div>
  );
}