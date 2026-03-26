"use client";

import { useState } from "react";
import {
  Users,
  CheckCircle2,
  BarChart3,
  Lock,
  ArrowRight,
  Loader2,
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
}

export function JoinChallengeButton({
  challengeId,
  initialHasJoined,
  isPremium,
}: JoinChallengeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(initialHasJoined);

  const handleJoin = async () => {
    if (joined) return;

    setLoading(true);
    try {
      if (isPremium) {
        const result = await createPaymentSession(challengeId);

        if (result?.url) {
          window.location.href = result.url;
          return;
        } else {
          throw new Error("Could not generate payment link.");
        }
      }

      await joinChallenge(challengeId);
      setJoined(true);
      toast.success("Successfully joined the challenge!");
    } catch (error: any) {
      console.error("Failed to join challenge", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      if (!isPremium) setLoading(false);
    }
  };

  // --- SUCCESS STATE (Already Joined) ---
  if (joined) {
    return (
      <div className="animate-in fade-in zoom-in flex flex-col items-center gap-6 rounded-[40px] border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] duration-300">
        <div className="flex h-16 w-16 rotate-3 items-center justify-center rounded-2xl border-4 border-black bg-[#A3E635] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CheckCircle2 className="h-10 w-10 stroke-[3px] text-black" />
        </div>

        <div className="space-y-2">
          <h4 className="text-3xl font-black tracking-tighter text-black uppercase italic">
            You&apos;re in!
          </h4>
          <p className="text-sm font-bold tracking-tight text-black/50 uppercase">
            Challenge Accepted. Time to dominate.
          </p>
        </div>

        <Link href={`/participations/${challengeId}`} className="w-full">
          <Button className="group h-16 w-full rounded-2xl border-4 border-black bg-black text-lg font-black text-white transition-all hover:bg-zinc-800 hover:shadow-[4px_4px_0px_0px_rgba(163,230,53,1)] active:scale-95">
            SEE MY PROGRESS
            <BarChart3 className="ml-3 h-6 w-6 transition-transform group-hover:scale-110 group-hover:rotate-6" />
          </Button>
        </Link>
      </div>
    );
  }

  // --- JOIN / UNLOCK STATE ---
  return (
    <Button
      size="lg"
      onClick={handleJoin}
      disabled={loading}
      className={cn(
        "group h-20 w-full rounded-[30px] border-4 border-black py-7 text-xl font-black tracking-tighter italic transition-all duration-200 active:scale-95",
        isPremium
          ? "bg-black text-white shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] hover:bg-zinc-900"
          : "bg-[#A3E635] text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#92d42d] hover:shadow-none",
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />
          <span>VERIFYING...</span>
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
