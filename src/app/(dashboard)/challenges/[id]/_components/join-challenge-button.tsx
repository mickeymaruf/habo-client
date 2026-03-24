"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinChallenge } from "@/actions/participation";

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

  return (
    <Button
      size="lg"
      className="w-full bg-[#A3E635] py-6 font-semibold text-black hover:bg-[#92d42d]"
      onClick={handleJoin}
      disabled={joined || loading}
    >
      {joined ? "JOINED ✅" : "JOIN CHALLENGE"}{" "}
      <Users className="ml-2 h-5 w-5" />
    </Button>
  );
}
