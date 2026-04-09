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
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h3 className="text-sm font-black tracking-[0.3em] text-black uppercase dark:text-white">
          Daily Tasks
        </h3>
        <p className="text-[10px] font-bold text-black/30 uppercase dark:text-zinc-500">
          {state.filter((s) => s.completed).length} of {state.length} complete
        </p>
      </div>

      <div className="border-t-2 border-black dark:border-zinc-800">
        {state.length > 0 ? (
          state.map((challenge) => (
            <div
              key={challenge.id}
              className={cn(
                "group flex items-center justify-between border-b border-black/10 py-6 transition-colors dark:border-zinc-800/50",
                challenge.completed
                  ? "bg-zinc-50/50 dark:bg-zinc-900/20"
                  : "hover:bg-[#A3E635]/5 dark:hover:bg-[#A3E635]/5",
              )}
            >
              <div className="flex items-center gap-8 px-2">
                {/* Minimalist Day Index */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-black/20 uppercase dark:text-zinc-600">
                    Day
                  </span>
                  <span className="text-2xl leading-none font-black text-black tabular-nums dark:text-white">
                    {challenge.currentDay.toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="h-10 w-[2px] bg-black dark:bg-zinc-800" />

                {/* Title and Badge */}
                <div className="flex flex-col gap-1">
                  <h3
                    className={cn(
                      "text-xl font-black tracking-tight uppercase italic transition-all",
                      challenge.completed
                        ? "text-black/20 line-through dark:text-zinc-700"
                        : "text-black dark:text-white",
                    )}
                  >
                    {challenge.title}
                  </h3>
                  <p className="mt-1 w-fit rounded-sm bg-black px-2 py-0.5 text-[10px] font-black tracking-widest text-[#A3E635] uppercase dark:bg-[#A3E635] dark:text-black">
                    {challenge.totalDays} Day Mission
                  </p>
                </div>
              </div>

              {/* Square Tactical Checkbox */}
              <div className="pr-4">
                {challenge.loading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-black dark:text-white" />
                ) : (
                  <Checkbox
                    checked={challenge.completed}
                    disabled={challenge.completed || challenge.loading}
                    onCheckedChange={() => handleCheck(challenge.id)}
                    className={cn(
                      "h-14 w-14 rounded-none border-2 border-black transition-all dark:border-zinc-700",
                      "data-[state=checked]:border-black data-[state=checked]:bg-[#A3E635] data-[state=checked]:text-black dark:data-[state=checked]:border-[#A3E635]",
                      "hover:border-black hover:bg-[#A3E635] dark:hover:border-[#A3E635]",
                    )}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-black/20 uppercase dark:text-zinc-700">
              Checklist Empty
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
