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

      // Get the payment link from Supabase secrets
      const { data, error } = await supabase.functions.invoke('get-payment-link', {
        body: { plan }
      });

      if (error) throw error;
      if (data?.url) {
        // Open the payment link in a new tab
        window.open(data.url, '_blank');
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
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Choose Your Plan
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-4 flex flex-col">
            <h3 className="font-semibold text-lg">Basic</h3>
            <p className="text-sm text-muted-foreground mt-2">Get started for free</p>
            <div className="mt-4">
              <p className="font-bold text-2xl">Free</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm flex-grow">
              <li>✓ Limited AI tutoring sessions</li>
              <li>✓ Basic progress tracking</li>
              <li>✓ Community forums access</li>
              <li>✓ Join public study groups</li>
            </ul>
            <Button
              onClick={() => handleSubscribe('basic')}
              className="mt-4"
              variant="outline"
              disabled={loading === 'basic'}
            >
              Get Started
            </Button>
          </div>

          <div className="rounded-lg border p-4 flex flex-col border-primary bg-primary/5">
            <div className="absolute -top-3 right-4 px-3 py-1 bg-primary text-white text-xs rounded-full">
              Most Popular
            </div>
            <h3 className="font-semibold text-lg">Premium</h3>
            <p className="text-sm text-muted-foreground mt-2">Everything you need</p>
            <div className="mt-4">
              <p className="font-bold text-2xl">$9.99/mo</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm flex-grow">
              <li>✓ Unlimited AI tutoring</li>
              <li>✓ Advanced progress tracking</li>
              <li>✓ Create private study groups</li>
              <li>✓ Personalized learning paths</li>
              <li>✓ Premium learning resources</li>
              <li>✓ Achievement system</li>
              <li>✓ Save chat history</li>
            </ul>
            <Button
              onClick={() => handleSubscribe('premium')}
              className="mt-4"
              disabled={loading === 'premium'}
            >
              Start Premium
            </Button>
          </div>

          <div className="rounded-lg border p-4 flex flex-col">
            <h3 className="font-semibold text-lg">Family</h3>
            <p className="text-sm text-muted-foreground mt-2">Perfect for families</p>
            <div className="mt-4">
              <p className="font-bold text-2xl">$24.99/mo</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm flex-grow">
              <li>✓ Up to 4 student accounts</li>
              <li>✓ Parent dashboard</li>
              <li>✓ Family progress reports</li>
              <li>✓ Shared resources library</li>
              <li>✓ Group tutoring sessions</li>
              <li>✓ Priority support</li>
              <li>✓ Custom learning paths</li>
            </ul>
            <Button
              onClick={() => handleSubscribe('family')}
              className="mt-4"
              variant="outline"
              disabled={loading === 'family'}
            >
              Start Family Plan
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Student Success Pack</h3>
              <p className="text-sm text-muted-foreground">One-time purchase, lifetime value</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>✓ 6 months Premium access</li>
                <li>✓ Study skills masterclass</li>
                <li>✓ Exam preparation toolkit</li>
                <li>✓ 3 one-on-one tutoring sessions</li>
                <li>✓ Lifetime access to recorded workshops</li>
              </ul>
            </div>
            <div className="text-right">
              <p className="font-bold text-2xl">$99</p>
              <p className="text-sm text-muted-foreground">One-time payment</p>
              <Button
                onClick={() => handleSubscribe('success-pack')}
                className="mt-2"
                variant="secondary"
                disabled={loading === 'success-pack'}
              >
                Get Success Pack
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}