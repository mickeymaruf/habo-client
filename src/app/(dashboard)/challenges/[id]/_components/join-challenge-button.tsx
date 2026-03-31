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
          className="group h-20 w-full rounded-[30px] border-4 border-black bg-white py-7 text-xl font-black tracking-tighter text-black uppercase italic shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] transition-all duration-200 hover:shadow-none active:scale-95"
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 stroke-[3px] text-[#A3E635]" />
            <span>TRACK MY PROGRESS</span>
            <ArrowRight className="h-6 w-6 stroke-[3px] transition-transform group-hover:translate-x-2" />
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
        "group h-20 w-full rounded-[30px] border-4 border-black py-7 text-xl font-black tracking-tighter italic transition-all duration-200 active:scale-95",
        isRejoining || !isPremium
          ? "bg-[#A3E635] text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#92d42d] hover:shadow-none"
          : "bg-black text-white shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] hover:bg-zinc-900",
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />
          <span>VERIFYING...</span>
        </div>
      ) : isRejoining ? (
        <div className="flex items-center gap-3">
          <RotateCcw className="h-6 w-6 stroke-[3px]" />
          <span>REJOIN MISSION</span>
          <ArrowRight className="h-6 w-6 stroke-[3px] transition-transform group-hover:translate-x-2" />
        </div>
      ) : isPremium ? (
        <div className="flex items-center gap-3">
          <Lock className="h-6 w-6 stroke-[3px]" />
          <span>UNLOCK PREMIUM ACCESS</span>
          <ArrowRight className="h-6 w-6 stroke-[3px] transition-transform group-hover:translate-x-2" />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span>JOIN CHALLENGE</span>
          <Users className="h-6 w-6 stroke-[3px]" />
        </div>
      )}
    </Button>
  );
}
