"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { createProgress } from "@/actions/progress";
import { Participation } from "@/types/participation.types";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CheckList({
  participations,
}: {
  participations: Participation[];
}) {
  const [state, setState] = useState(() =>
    participations.map((p) => {
      const joined = new Date(p.joinedAt);
      const today = new Date();
      const diffDays =
        Math.floor(
          (today.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;

      return {
        id: p.id,
        title: p.challenge.title,
        emoji: "💪",
        completed: p.progressLogs.some(
          (log) =>
            log.completed &&
            new Date(log.date).toDateString() === today.toDateString(),
        ),
        currentDay: Math.min(diffDays, p.challenge.durationDays),
        totalDays: p.challenge.durationDays,
        loading: false,
      };
    }),
  );

  const handleCheck = async (participationId: string) => {
    setState((prev) =>
      prev.map((p) => (p.id === participationId ? { ...p, loading: true } : p)),
    );

    try {
      await createProgress({ participationId });

      setState((prev) =>
        prev.map((p) =>
          p.id === participationId
            ? { ...p, completed: true, loading: false }
            : p,
        ),
      );
    } catch (err) {
      console.error(err);
      setState((prev) =>
        prev.map((p) =>
          p.id === participationId ? { ...p, loading: false } : p,
        ),
      );
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h3 className="text-[10px] font-black tracking-[0.2em] text-black uppercase sm:text-sm sm:tracking-[0.3em]">
          Daily Tasks
        </h3>
        <p className="text-[9px] font-bold text-black/30 uppercase sm:text-[10px]">
          {state.filter((s) => s.completed).length} of {state.length} complete
        </p>
      </div>

      <div className="border-t-2 border-black">
        {state.length > 0 ? (
          state.map((challenge) => (
            <div
              key={challenge.id}
              className={cn(
                "group flex items-center justify-between border-b border-black/10 py-4 transition-colors sm:py-6",
                challenge.completed ? "bg-zinc-50/50" : "hover:bg-[#A3E635]/5",
              )}
            >
              <div className="flex min-w-0 items-center gap-3 px-1 sm:gap-8 sm:px-2">
                {/* Minimalist Day Index */}
                <div className="flex shrink-0 flex-col">
                  <span className="text-[8px] font-bold text-black/20 uppercase sm:text-[10px]">
                    Day
                  </span>
                  <span className="text-lg leading-none font-black text-black tabular-nums sm:text-2xl">
                    {challenge.currentDay.toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="h-8 w-[2px] shrink-0 bg-black sm:h-10" />

                {/* Title and Badge */}
                <div className="flex min-w-0 flex-col gap-1">
                  <h3
                    className={cn(
                      "truncate text-sm font-black tracking-tight uppercase italic transition-all sm:text-xl",
                      challenge.completed
                        ? "text-black/20 line-through"
                        : "text-black",
                    )}
                  >
                    {challenge.title}
                  </h3>
                  <p className="mt-0.5 w-fit rounded-sm bg-black px-1.5 py-0.5 text-[8px] font-black tracking-widest text-[#A3E635] uppercase sm:mt-1 sm:px-2 sm:text-[10px]">
                    {challenge.totalDays} Day Mission
                  </p>
                </div>
              </div>

              {/* Square Tactical Checkbox */}
              <div className="pr-2 pl-2 sm:pr-4">
                {challenge.loading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-black" />
                ) : (
                  <Checkbox
                    checked={challenge.completed}
                    disabled={challenge.completed || challenge.loading}
                    onCheckedChange={() => handleCheck(challenge.id)}
                    className={cn(
                      "h-10 w-10 rounded-none border-2 border-black transition-all sm:h-14 sm:w-14",
                      "data-[state=checked]:border-black data-[state=checked]:bg-[#A3E635] data-[state=checked]:text-black",
                      "hover:border-black hover:bg-[#A3E635]",
                    )}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-black/20 uppercase">
              Checklist Empty
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
