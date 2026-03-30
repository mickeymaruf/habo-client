"use client";

import { useEffect } from "react";
import { ArrowLeft, RotateCcw, AlertOctagon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-20 md:px-0">
      <div className="relative overflow-hidden rounded-[30px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] md:rounded-[50px] md:shadow-[12px_12px_0px_0px_rgba(239,68,68,1)]">
        {/* --- ALERT BANNER --- */}
        <div className="relative flex h-24 w-full items-center justify-between overflow-hidden border-b-4 border-black bg-[#EF4444] px-4 md:h-28 md:px-8">
          <div className="z-20 flex items-center gap-2 rounded-xl border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <AlertOctagon className="h-5 w-5 stroke-[3px] text-[#EF4444]" />
            <span className="text-xs font-black tracking-tighter text-black uppercase italic">
              System_Crash
            </span>
          </div>

          <div className="absolute inset-0 z-0 [background-image:linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] [background-size:20px_20px] opacity-5" />
        </div>

        {/* --- CONTENT --- */}
        <div className="flex flex-col items-center px-6 py-16 text-center md:py-24">
          <h1 className="mb-4 text-5xl font-black tracking-tighter text-black uppercase italic md:text-7xl">
            Something_Broke
          </h1>
          <p className="mb-12 max-w-sm text-sm leading-tight font-bold text-black/40 uppercase md:text-base">
            An unexpected error occurred while processing your request. Our
            systems are looking into it.
          </p>

          <div className="flex w-full max-w-xs flex-col items-center gap-4">
            {/* TRY AGAIN BUTTON */}
            <button
              onClick={() => reset()}
              className={cn(
                "group flex w-full items-center justify-center gap-3 border-4 border-black bg-[#A3E635] py-6 text-xl font-black tracking-tighter uppercase italic transition-all",
                "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
              )}
            >
              <RotateCcw className="h-6 w-6 stroke-[3px] transition-transform duration-500 group-active:rotate-180" />
              Re-Sync System
            </button>

            {/* GO BACK HOME */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-black/30 uppercase transition-colors hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 stroke-[3px]" />
              GO BACK
            </button>
          </div>
        </div>

        {/* BOTTOM DECOR */}
        <div className="pointer-events-none absolute -right-4 -bottom-4 opacity-5">
          <span className="text-9xl font-black italic">ERROR_500</span>
        </div>
      </div>
    </div>
  );
}
