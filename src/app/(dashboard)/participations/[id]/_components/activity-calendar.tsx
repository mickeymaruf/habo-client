"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

interface ProgressLog {
  id: string;
  date: string;
  completed: boolean;
  note?: string | null;
}

export default function ActivityCalendar({
  joinedAt,
  progressLogs,
}: {
  joinedAt: string;
  progressLogs: ProgressLog[];
}) {
  const challengeJoinedAt = new Date(joinedAt); // Calendar current month

  const [currentMonth, setCurrentMonth] = useState(new Date()); // Transform logs to Date[] of completed days

  const completedDays = progressLogs
    .filter((p) => p.completed)
    .map((p) => parseISO(p.date));

  return (
    <Card className="w-fit border-none bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {format(currentMonth, "MMMM, yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          captionLayout="dropdown"
          selected={completedDays}
          startMonth={challengeJoinedAt}
          endMonth={new Date()}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="w-full p-0"
          styles={{
            day: {
              border: "1px solid #f1f1f1",
              margin: "3px",
              height: 48,
              width: 48,
              fontWeight: 600,
              cursor: "default", // not clickable
            },

            day_selected: {
              backgroundColor: "#bbf7d0", // light green
              color: "#166534",
              borderRadius: "9999px",
            },
          }}
          classNames={{
            day_selected: "rounded-full bg-blue-600 text-white",
            day: "rounded-full flex items-center justify-center",
            today: "rounded-full bg-yellow-100",
          }}
          onSelect={() => {}}
        />
      </CardContent>
    </Card>
  );
}
