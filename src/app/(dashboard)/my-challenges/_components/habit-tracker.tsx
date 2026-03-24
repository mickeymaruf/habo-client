"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function HabitTracker() {
  const challengeJoinedAt = new Date(2026, 1, 2);

  // 1. Manage which month is currently being viewed
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  // 2. Manage selected (completed) days
  const [completedDays, setCompletedDays] = React.useState<Date[] | undefined>([
    new Date(2023, 11, 1),
    new Date(2023, 11, 5),
    new Date(2023, 11, 9),
    new Date(2023, 11, 10),
    new Date(2023, 11, 16),
    new Date(2023, 11, 17),
    new Date(2023, 11, 20),
    new Date(2023, 11, 22),
    new Date(2023, 11, 28),
  ]);

  return (
    <Card className="w-fit border-none bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        {/* Dynamic Title based on current visible month */}
        <CardTitle className="text-2xl font-bold tracking-tight">
          {format(currentMonth, "MMMM, yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          captionLayout="dropdown"
          selected={completedDays}
          onSelect={setCompletedDays}
          startMonth={challengeJoinedAt}
          endMonth={new Date()}
          // 3. Navigation Logic
          month={currentMonth} // Controls the current view
          onMonthChange={setCurrentMonth} // Updates view when arrows are clicked
          className="w-full p-0"
          // Applying your specific styles
          styles={{
            day: {
              border: "1px solid #f1f1f1",
              margin: "3px",
              height: 48,
              width: 48,
              fontWeight: 600,
              cursor: "pointer",
            },
          }}
          classNames={{
            // Ensures the selected blue/orange circle is rounded
            day_selected:
              "rounded-full bg-blue-600 text-white hover:bg-blue-700",
            day: "rounded-full flex items-center justify-center",
            today: "rounded-full bg-yellow-100",
          }}
          disabled={(currentDate) => currentDate > new Date()}
        />
      </CardContent>
    </Card>
  );
}
