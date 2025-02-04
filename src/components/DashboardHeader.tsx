import { GraduationCap, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SubscriptionModal } from "@/components/student/SubscriptionModal";

export function DashboardHeader() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">AfriQuest Academy</span>
        </div>
        <Button
          onClick={() => setShowSubscriptionModal(true)}
          className="gap-2"
          variant="secondary"
        >
          <CreditCard className="h-4 w-4" />
          Upgrade
        </Button>
      </div>
      <SubscriptionModal 
        open={showSubscriptionModal} 
        onOpenChange={setShowSubscriptionModal} 
      />
    </header>
  );
}