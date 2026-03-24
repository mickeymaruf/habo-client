"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  format,
  parseISO,
  eachDayOfInterval,
  startOfWeek,
  startOfDay,
} from "date-fns";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProgressLog {
  id: string;
  date: string;
  completed: boolean;
  note?: string | null;
}

export default function ActivityGraph({
  joinedAt,
  progressLogs,
  durationDays,
}: {
  joinedAt: string;
  progressLogs: ProgressLog[];
  durationDays: number;
}) {
  const startDate = useMemo(() => startOfWeek(parseISO(joinedAt)), [joinedAt]);
  const endDate = new Date();

  const logMap = useMemo(() => {
    const map = new Map<string, ProgressLog>();
    progressLogs.forEach((log) => {
      if (log.completed) {
        const dateKey = format(startOfDay(parseISO(log.date)), "yyyy-MM-dd");
        map.set(dateKey, log);
      }
    });
    return map;
  }, [progressLogs]);

  const weeks = useMemo(() => {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weeksArr: Date[][] = [];
    let currentWeek: Date[] = [];

    days.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) weeksArr.push(currentWeek);
    return weeksArr;
  }, [startDate, endDate]);

  const totalCompleted = progressLogs.filter((p) => p.completed).length;

  return (
    <TooltipProvider delayDuration={0}>
      <Card className="w-full rounded-xl border border-[#30363d] bg-[#0d1117] p-6 text-[#e6edf3]">
        <CardHeader className="mb-6 p-0">
          <CardTitle className="text-sm font-normal text-[#8b949e]">
            <span className="mb-1 block text-4xl font-bold text-white">
              {totalCompleted}
            </span>
            Contributions since joining
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex min-w-max flex-col pb-4">
              {/* Month Labels */}
              <div className="mb-2 ml-10 flex h-5 text-[12px] text-[#8b949e]">
                {weeks
                  .reduce(
                    (acc: { month: string; weeksCount: number }[], week, i) => {
                      const monthName = format(week[0], "MMM");
                      if (i === 0 || monthName !== acc[acc.length - 1].month) {
                        acc.push({ month: monthName, weeksCount: 1 });
                      } else {
                        acc[acc.length - 1].weeksCount++;
                      }
                      return acc;
                    },
                    [],
                  )
                  .map((m, i) => (
                    <div
                      key={i}
                      // 14px (box) + 4px (gap) = 18px per week column
                      style={{ width: `${m.weeksCount * 18}px` }}
                      className="shrink-0"
                    >
                      <span>{m.month}</span>
                    </div>
                  ))}
              </div>

              <div className="flex gap-3">
                {/* Weekday Labels */}
                <div className="flex h-[122px] flex-col justify-between pb-1 text-[12px] text-[#8b949e]">
                  <span className="h-[14px]"></span>
                  <span className="leading-[14px]">Mon</span>
                  <span className="h-[14px]"></span>
                  <span className="leading-[14px]">Wed</span>
                  <span className="h-[14px]"></span>
                  <span className="leading-[14px]">Fri</span>
                  <span className="h-[14px]"></span>
                </div>

                {/* Grid: Columns = Weeks, Rows = Days */}
                <div className="flex gap-[4px]">
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[4px]">
                      {week.map((day) => {
                        const dateStr = format(day, "yyyy-MM-dd");
                        const logEntry = logMap.get(dateStr);
                        const isCompleted = !!logEntry;

                        return (
                          <Tooltip key={dateStr}>
                            <TooltipTrigger asChild>
                              <div
                                className={`h-[14px] w-[14px] rounded-[3px] transition-all ${
                                  isCompleted
                                    ? "bg-[#39d353] ring-white hover:ring-2"
                                    : "border border-[#30363d] bg-[#161b22]"
                                }`}
                              />
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              sideOffset={8}
                              className="border border-[#30363d] bg-[#161b22] p-2 text-xs text-white [&_svg]:hidden!"
                            >
                              <p className="font-medium">
                                {isCompleted ? "Completed" : "No contribution"}{" "}
                                on {format(day, "MMM dd, yyyy")}
                              </p>
                              {logEntry?.note && (
                                <p className="mt-1 text-[#8b949e] italic">
                                  "{logEntry.note}"
                                </p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ScrollBar
              orientation="horizontal"
              className="flex touch-none bg-[#161b22] p-0.5 opacity-100 transition-colors select-none"
            />
          </ScrollArea>

          {/* Footer Legend */}
          <div className="mt-8 flex items-center gap-3 border-t border-[#30363d] pt-5 text-[13px] text-[#8b949e]">
            <div className="h-3 w-3 rounded-full bg-[#39d353]" />
            <span>
              You have stayed consistent for{" "}
              <b className="text-white">{totalCompleted}</b> out of{" "}
              <b className="text-white">{durationDays}</b> days.
            </span>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
