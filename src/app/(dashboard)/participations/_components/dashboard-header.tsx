"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

export default function DashboardHeader() {
  const [now, setNow] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl space-y-8 pb-12">
      {/* Greeting Section - Mission Style */}
      <div className="relative inline-block">
        <div className="absolute -inset-2 z-0 -rotate-1 border-4 border-black bg-[#A3E635] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
        <div className="relative z-10 rotate-1 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="mb-4 text-5xl leading-[0.8] font-black tracking-tighter text-black uppercase italic md:text-6xl">
            HAPPY <br /> {format(now, "EEEE")}
          </h1>
          <div className="flex w-fit items-center gap-2 bg-black px-3 py-1">
            <span className="text-[10px] font-black tracking-[0.2em] text-[#A3E635] uppercase">
              {format(now, "dd MMM yyyy • HH:mm").toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons - Heavy Brutalist */}
      <div className="flex flex-col gap-4 pt-4 md:flex-row">
        <Button
          asChild
          className="group relative h-20 flex-1 rounded-2xl border-4 border-black bg-[#A3E635] text-xl font-black tracking-tighter text-black italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#92d42d] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:scale-95"
        >
          <Link
            href="/challenges/new"
            className="flex items-center justify-center gap-3"
          >
            <Plus className="h-6 w-6 stroke-[4px]" />
            CREATE MISSION
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="group relative h-20 flex-1 rounded-2xl border-4 border-black bg-white text-xl font-black tracking-tighter text-black italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-zinc-50 hover:shadow-[6px_6px_0px_0px_rgba(163,230,53,1)] active:scale-95"
        >
          <Link
            href="/challenges"
            className="flex items-center justify-center gap-3"
          >
            <Target className="h-6 w-6 stroke-[3px]" />
            BROWSE FEED
          </Link>
        </Button>
      </div>
    </div>
  );
}
