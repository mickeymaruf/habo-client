"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { removeVote, voteChallenge } from "@/actions/vote";

interface VoteButtonProps {
  challengeId: string;
  initialVotes: number;
  initialHasVoted: boolean;
}

export function VoteButton({
  challengeId,
  initialVotes,
  initialHasVoted,
}: VoteButtonProps) {
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [votesCount, setVotesCount] = useState(initialVotes);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async () => {
    if (isLoading) return; // Prevent double-clicks

    // 1. Store original state for rollback
    const originalHasVoted = hasVoted;
    const originalCount = votesCount;

    try {
      setIsLoading(true);

      // 2. Optimistic Update
      setHasVoted(!originalHasVoted);
      setVotesCount((prev) => (originalHasVoted ? prev - 1 : prev + 1));

      // 3. Server Action Call
      if (originalHasVoted) {
        // If already voted, we remove it
        await removeVote(challengeId);
      } else {
        // If not voted, we send an upvote (value: 1)
        await voteChallenge({ challengeId, value: 1 });
      }
    } catch (error) {
      // 4. Rollback on failure
      setHasVoted(originalHasVoted);
      setVotesCount(originalCount);
      console.error("Vote failed to sync:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isLoading}
      className={`group flex items-center justify-center gap-4 border-4 border-black px-8 py-3 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-70 ${
        hasVoted ? "bg-[#A3E635]" : "bg-white hover:bg-[#A3E635]"
      }`}
    >
      <div className="flex items-center gap-2 border-r-2 border-black/10 pr-4">
        <ThumbsUp
          className={`h-5 w-5 stroke-[3px] transition-transform group-hover:scale-110 ${
            hasVoted ? "fill-black" : "fill-none"
          }`}
        />
        <span className="text-xl font-black tracking-tighter italic">
          {votesCount}
        </span>
      </div>
      <span className="text-base font-black tracking-tighter uppercase italic">
        {hasVoted ? "Voted_In" : "Vote Now"}
      </span>
    </button>
  );
}
