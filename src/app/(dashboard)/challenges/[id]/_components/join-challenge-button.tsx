"use client";

import { useState } from "react";
import { Users, CheckCircle2, ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinChallenge } from "@/actions/participation";
import Link from "next/link";

interface JoinChallengeButtonProps {
  challengeId: string;
  initialHasJoined: boolean;
}

export function JoinChallengeButton({
  challengeId,
  initialHasJoined,
}: JoinChallengeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(initialHasJoined);

  const handleJoin = async () => {
    if (joined) return;
    setLoading(true);
    try {
      await joinChallenge(challengeId);
      setJoined(true);
    } catch (error) {
      console.error("Failed to join challenge", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. Show this UI if the user has already joined (or just joined)
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

  // 2. Default Join Button
  return (
    <Button
      size="lg"
      className="w-full bg-[#A3E635] py-6 font-semibold text-black hover:bg-[#92d42d]"
      onClick={handleJoin}
      disabled={loading}
    >
      {loading ? (
        "JOINING..."
      ) : (
        <>
          JOIN CHALLENGE <Users className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}
