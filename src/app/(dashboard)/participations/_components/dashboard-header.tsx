"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
    <div className="w-full max-w-md space-y-6 pb-8">
      {/* Greeting Section */}
      <div className="space-y-1">
        <h1 className="text-4xl leading-snug font-semibold tracking-tight text-slate-900">
          Happy <br /> {format(now, "EEEE")}{" "}
          <span className="text-3xl">👋</span>
        </h1>
        <p className="mt-2 text-gray-700">
          {format(now, "dd MMM yyyy, hh:mm aa").toLowerCase()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          asChild
          className="h-14 w-full gap-2 text-lg font-semibold text-white"
        >
          <Link href="/challenges/new">
            <Plus className="h-5 w-5" />
            New Habits
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-14 w-full text-lg font-semibold"
        >
          <Link href="/challenges">Browse Popular Habits</Link>
        </Button>
      </div>
    </div>
  );
}
