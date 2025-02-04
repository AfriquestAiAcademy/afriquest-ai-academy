import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: string) => {
    try {
      setLoading(plan);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to subscribe");
        return;
      }

      const { data, error } = await supabase.functions.invoke('get-payment-link', {
        body: { plan, userId: user.id }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("Failed to process subscription request");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Choose Your Plan
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-4 flex flex-col">
            <h3 className="font-semibold text-lg">Premium</h3>
            <p className="text-sm text-muted-foreground mt-2">Perfect for individual students</p>
            <div className="mt-4">
              <p className="font-bold text-2xl">$9.99/mo</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm flex-grow">
              <li>✓ Unlimited AI tutoring</li>
              <li>✓ Homework assistance</li>
              <li>✓ Progress tracking</li>
            </ul>
            <Button
              onClick={() => handleSubscribe('premium')}
              className="mt-4"
              disabled={loading === 'premium'}
            >
              {loading === 'premium' ? 'Processing...' : 'Get Started'}
            </Button>
          </div>

          <div className="rounded-lg border p-4 flex flex-col border-primary bg-primary/5">
            <h3 className="font-semibold text-lg">Family</h3>
            <p className="text-sm text-muted-foreground mt-2">Great for families</p>
            <div className="mt-4">
              <p className="font-bold text-2xl">$24.99/mo</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm flex-grow">
              <li>✓ Up to 4 student accounts</li>
              <li>✓ Parent dashboard</li>
              <li>✓ Family progress reports</li>
              <li>✓ All Premium features</li>
            </ul>
            <Button
              onClick={() => handleSubscribe('family')}
              className="mt-4"
              disabled={loading === 'family'}
            >
              {loading === 'family' ? 'Processing...' : 'Best Value'}
            </Button>
          </div>

          <div className="rounded-lg border p-4 flex flex-col">
            <h3 className="font-semibold text-lg">Classroom</h3>
            <p className="text-sm text-muted-foreground mt-2">For educators</p>
            <div className="mt-4">
              <p className="font-bold text-2xl">$99.99/mo</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm flex-grow">
              <li>✓ Up to 30 student accounts</li>
              <li>✓ Teacher dashboard</li>
              <li>✓ Detailed analytics</li>
              <li>✓ All Premium features</li>
            </ul>
            <Button
              onClick={() => handleSubscribe('classroom')}
              className="mt-4"
              disabled={loading === 'classroom'}
            >
              {loading === 'classroom' ? 'Processing...' : 'Get Started'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}