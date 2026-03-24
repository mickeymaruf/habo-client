"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { isSameDay } from "date-fns";
import { progressService } from "@/services/progress.service";
import { createProgress } from "@/actions/progress";

export interface TaskItem {
  id: string; // participation ID
  title: string; // challenge title
  emoji?: string; // optional emoji for the task
  completed: boolean; // if today’s task is completed
  completedDays: number; // total completed days
  totalDays: number; // challenge duration
  note?: string | null; // optional note for today
  progressLogs: {
    id: string;
    date: string; // ISO date
    note?: string | null;
    completed: boolean;
    createdAt: string;
  }[];
}

export interface Participation {
  id: string;
  userId: string;
  challengeId: string;
  joinedAt: string;
  progress: number; // percent complete
  completed: boolean;
  challenge: {
    id: string;
    title: string;
    description: string;
    durationDays: number;
    category: string;
    isPremium: boolean;
    price?: number | null;
    status: string;
  };
  progressLogs: TaskItem["progressLogs"];
}

export interface MyParticipationsResponse {
  success: boolean;
  message: string;
  data: Participation[];
}

export default function HabitList({
  participations,
}: {
  participations: Participation[];
}) {
  const today = new Date();

  const [state, setState] = React.useState(() =>
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
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Today's checklist</h3>
        <button className="text-sm">View Details</button>
      </div>
      <div className="space-y-6 rounded-3xl bg-white p-4">
        {state.map((habit) => (
          <div key={habit.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Emoji Container */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
                {habit.emoji || "🏆"}
              </div>

              {/* Task Info */}
              <div className="flex flex-1 flex-col gap-1">
                <h3
                  className={cn(
                    "text-lg transition-all",
                    habit.completed ? "line-through" : "",
                  )}
                >
                  {habit.title}
                </h3>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>
                    {habit.currentDay}/{habit.totalDays} days
                  </span>
                </div>
              </div>
            </div>

            <Checkbox
              checked={habit.completed}
              disabled={habit.completed || habit.loading}
              onCheckedChange={() => handleCheck(habit.id)}
              className={cn(
                "h-7 w-7 cursor-pointer rounded-lg border-2",
                "data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
