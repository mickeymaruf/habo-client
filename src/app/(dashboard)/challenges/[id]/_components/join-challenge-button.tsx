"use client";

import { useState } from "react";
import { Users, CheckCircle2, BarChart3, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinChallenge } from "@/actions/participation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPaymentSession } from "@/actions/payment";
import { toast } from "sonner";

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
  const router = useRouter();

  const handleJoin = async () => {
    if (joined) return;

    setLoading(true);
    try {
      if (isPremium) {
        const result = await createPaymentSession(challengeId);

        if (result?.url) {
          // Redirect the entire window to Stripe
          window.location.href = result.url;
          return; // Stop execution here as the page is unloading
        } else {
          throw new Error("Could not generate payment link.");
        }
      }

      // Logic for Free Challenges
      await joinChallenge(challengeId);
      setJoined(true);
      toast.success("Successfully joined the challenge!");
    } catch (error: any) {
      console.error("Failed to join challenge", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      // We only set loading to false if we didn't redirect
      if (!isPremium) setLoading(false);
    }
  };

  if (joined) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-[#A3E635]/30 bg-[#A3E635]/5 p-6 text-center duration-300">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A3E635] text-black">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <div>
          <h4 className="text-xl font-bold text-black">You&apos;re in!</h4>
          <p className="text-sm font-medium text-black/60">
            You are officially part of this challenge. Time to crush those
            goals!
          </p>
        </div>

        <Link href={`/participations/${challengeId}`} className="w-full">
          <Button className="group w-full bg-black py-6 font-bold text-white hover:bg-black/80">
            SEE MY PROGRESS
            <BarChart3 className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Button
      size="lg"
      onClick={handleJoin}
      disabled={loading}
      className="w-full bg-[#A3E635] py-7 text-base font-bold tracking-tight text-black transition-all duration-200 hover:bg-[#92d42d]"
    >
      {loading ? (
        "PROCESSING..."
      ) : isPremium ? (
        <div className="flex items-center gap-3">
          <Lock className="h-4 w-4" />
          <span>UNLOCK PREMIUM ACCESS</span>
          <ArrowRight className="h-5 w-5 opacity-50 transition-transform group-hover:translate-x-1" />
        </div>
      ) : (
        <>
          JOIN CHALLENGE <Users className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}
