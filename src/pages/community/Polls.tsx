import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Poll {
  id: string;
  title: string;
  description: string | null;
  options: { text: string; votes: number }[];
  created_at: string;
  profiles: {
    full_name: string | null;
  };
}

export function Polls() {
  const [newPollTitle, setNewPollTitle] = useState("");
  const [newPollDescription, setNewPollDescription] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>([""]);
  const [isCreating, setIsCreating] = useState(false);

  const { data: polls, isLoading } = useQuery({
    queryKey: ['polls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('polls')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Poll[];
    },
  });

  const submitVote = async (pollId: string, optionIndex: number) => {
    const { error } = await supabase
      .from('poll_responses')
      .insert({
        poll_id: pollId,
        selected_option: optionIndex.toString(),
        user_id: (await supabase.auth.getUser()).data.user?.id,
      });

    if (error) {
      if (error.code === '23505') {
        toast.error("You have already voted in this poll");
      } else {
        toast.error("Failed to submit vote");
      }
      return;
    }

    toast.success("Vote submitted successfully");
  };

  const createPoll = async () => {
    if (!newPollTitle.trim() || pollOptions.some(opt => !opt.trim())) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsCreating(true);

    const { error } = await supabase
      .from('polls')
      .insert({
        title: newPollTitle.trim(),
        description: newPollDescription.trim() || null,
        options: pollOptions.map(text => ({ text, votes: 0 })),
        creator_id: (await supabase.auth.getUser()).data.user?.id,
      });

    setIsCreating(false);

    if (error) {
      toast.error("Failed to create poll");
      return;
    }

    setNewPollTitle("");
    setNewPollDescription("");
    setPollOptions([""]);
    toast.success("Poll created successfully");
  };

  if (isLoading) {
    return <div>Loading polls...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community Polls</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Poll
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Poll</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Poll title"
                value={newPollTitle}
                onChange={(e) => setNewPollTitle(e.target.value)}
              />
              <Textarea
                placeholder="Poll description (optional)"
                value={newPollDescription}
                onChange={(e) => setNewPollDescription(e.target.value)}
              />
              <div className="space-y-2">
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...pollOptions];
                        newOptions[index] = e.target.value;
                        setPollOptions(newOptions);
                      }}
                    />
                    {pollOptions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setPollOptions(pollOptions.filter((_, i) => i !== index));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setPollOptions([...pollOptions, ""])}
                >
                  Add Option
                </Button>
              </div>
              <Button onClick={createPoll} disabled={isCreating}>
                Create Poll
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {polls?.map((poll) => (
          <Card key={poll.id}>
            <CardHeader>
              <CardTitle>{poll.title}</CardTitle>
              {poll.description && (
                <p className="text-muted-foreground">{poll.description}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Created by {poll.profiles.full_name || "Anonymous"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {poll.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => submitVote(poll.id, index)}
                  >
                    <span>{option.text}</span>
                    <span className="text-muted-foreground">
                      {option.votes} votes
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}