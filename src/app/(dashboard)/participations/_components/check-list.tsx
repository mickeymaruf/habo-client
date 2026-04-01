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
    <>
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h3 className="text-sm font-black tracking-[0.3em] text-black uppercase">
          Daily Tasks
        </h3>
        <p className="text-[10px] font-bold text-black/30 uppercase">
          {state.filter((s) => s.completed).length} of {state.length} complete
        </p>
      </div>

      <div className="border-t-2 border-black">
        {state.length > 0 ? (
          state.map((challenge) => (
            <div
              key={challenge.id}
              className={cn(
                "group flex items-center justify-between border-b border-black/10 py-6 transition-colors",
                challenge.completed ? "bg-zinc-50/50" : "hover:bg-[#A3E635]/5",
              )}
            >
              <div className="flex items-center gap-8 px-2">
                {/* Minimalist Day Index */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-black/20 uppercase">
                    Day
                  </span>
                  <span className="text-2xl leading-none font-black text-black tabular-nums">
                    {challenge.currentDay.toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="h-10 w-[2px] bg-black" />

                {/* Title and Badge */}
                <div className="flex flex-col gap-1">
                  <h3
                    className={cn(
                      "text-xl font-black tracking-tight uppercase italic transition-all",
                      challenge.completed
                        ? "text-black/20 line-through"
                        : "text-black",
                    )}
                  >
                    {challenge.title}
                  </h3>
                  <p className="mt-1 w-fit rounded-sm bg-black px-2 py-0.5 text-[10px] font-black tracking-widest text-[#A3E635] uppercase">
                    {challenge.totalDays} Day Mission
                  </p>
                </div>
              </div>

              {/* Square Tactical Checkbox */}
              <div className="pr-4">
                {challenge.loading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-black" />
                ) : (
                  <Checkbox
                    checked={challenge.completed}
                    disabled={challenge.completed || challenge.loading}
                    onCheckedChange={() => handleCheck(challenge.id)}
                    className={cn(
                      "h-14 w-14 rounded-none border-2 border-black transition-all",
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
    </>
  );
}
