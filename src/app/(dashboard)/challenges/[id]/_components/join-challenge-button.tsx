"use client";

import { useState } from "react";
import {
  Users,
  BarChart3,
  Lock,
  ArrowRight,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinChallenge } from "@/actions/participation";
import Link from "next/link";
import { createPaymentSession } from "@/actions/payment";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface JoinChallengeButtonProps {
  challengeId: string;
  initialHasJoined: boolean;
  isPremium?: boolean;
  hasAccess?: boolean;
}

export function JoinChallengeButton({
  challengeId,
  initialHasJoined,
  isPremium,
  hasAccess,
}: JoinChallengeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(initialHasJoined);

  const handleJoin = async () => {
    if (joined) return;

    setLoading(true);
    try {
      // --- REJOIN OR FREE JOIN LOGIC ---
      // If they have access already (even if premium) or it's a free challenge
      if (hasAccess || !isPremium) {
        await joinChallenge(challengeId);
        setJoined(true);
        toast.success(
          hasAccess ? "Welcome back to the mission!" : "Successfully joined!",
        );
        setLoading(false);
        return;
      }

      // --- NEW PREMIUM PURCHASE LOGIC ---
      if (isPremium && !hasAccess) {
        const result = await createPaymentSession(challengeId);
        if (result?.url) {
          window.location.href = result.url;
          return;
        } else {
          throw new Error("Could not generate payment link.");
        }
      }
    } catch (error: any) {
      console.error("Action failed", error);
      toast.error(error.message || "Something went wrong.");
      setLoading(false);
    }
  };

  // 1. ACTIVE STATE: Already participating
  if (joined) {
    return (
      <Link href={`/participations/${challengeId}`} className="block w-full">
        <Button
          size="lg"
          className="group h-16 w-full rounded-[20px] border-4 border-black bg-white py-4 text-lg font-black tracking-tighter text-black uppercase italic shadow-[6px_6px_0px_0px_rgba(163,230,53,1)] transition-all duration-200 hover:shadow-none active:scale-95 md:h-20 md:rounded-[30px] md:py-7 md:text-xl md:shadow-[8px_8px_0px_0px_rgba(163,230,53,1)]"
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 stroke-[3px] text-[#A3E635] md:h-6 md:w-6" />
            <span>TRACK MY PROGRESS</span>
            <ArrowRight className="hidden h-5 w-5 stroke-[3px] transition-transform group-hover:translate-x-2 sm:block md:h-6 md:w-6" />
          </div>
        </Button>
      </Link>
    );
  }

  // 2. REJOIN STATE: Has access but status is "LEFT"
  const isRejoining = hasAccess && !joined;

  return (
    <Button
      size="lg"
      onClick={handleJoin}
      disabled={loading}
      className={cn(
        "group h-16 w-full rounded-[20px] border-4 border-black py-4 text-lg font-black tracking-tighter italic transition-all duration-200 active:scale-95 md:h-20 md:rounded-[30px] md:py-7 md:text-xl",
        isRejoining || !isPremium
          ? "bg-[#A3E635] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#92d42d] hover:shadow-none md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          : "bg-black text-white shadow-[6px_6px_0px_0px_rgba(163,230,53,1)] hover:bg-zinc-900 md:shadow-[8px_8px_0px_0px_rgba(163,230,53,1)]",
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin stroke-[3px] md:h-6 md:w-6" />
          <span>VERIFYING...</span>
        </div>
      ) : isRejoining ? (
        <div className="flex items-center gap-3">
          <RotateCcw className="h-5 w-5 stroke-[3px] md:h-6 md:w-6" />
          <span>REJOIN MISSION</span>
          <ArrowRight className="hidden h-5 w-5 stroke-[3px] transition-transform group-hover:translate-x-2 sm:block md:h-6 md:w-6" />
        </div>
      ) : isPremium ? (
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 stroke-[3px] md:h-6 md:w-6" />
          <span>UNLOCK PREMIUM ACCESS</span>
          <ArrowRight className="hidden h-5 w-5 stroke-[3px] transition-transform group-hover:translate-x-2 sm:block md:h-6 md:w-6" />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span>JOIN CHALLENGE</span>
          <Users className="h-5 w-5 stroke-[3px] md:h-6 md:w-6" />
        </div>
      )}
    </Button>
  );
}
