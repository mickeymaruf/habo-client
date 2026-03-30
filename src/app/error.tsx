"use client";

import { useEffect } from "react";
import { ArrowLeft, RotateCcw, AlertOctagon } from "lucide-react";
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
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col justify-center px-4 py-10 md:px-0">
      <div className="relative overflow-hidden rounded-[30px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] md:rounded-[50px] md:shadow-[12px_12px_0px_0px_rgba(239,68,68,1)]">
        {/* --- ALERT BANNER --- */}
        <div className="relative flex h-20 w-full items-center justify-between overflow-hidden border-b-4 border-black bg-[#EF4444] px-6 md:h-28 md:px-8">
          <div className="z-20 flex items-center gap-2 rounded-xl border-4 border-black bg-white px-3 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:px-4 md:py-2">
            <AlertOctagon className="h-4 w-4 stroke-[3px] text-[#EF4444] md:h-5 md:w-5" />
            <span className="text-[10px] font-black tracking-tighter text-black uppercase italic md:text-xs">
              System_Crash
            </span>
          </div>

          {/* Background Texture */}
          <div className="absolute inset-0 z-0 [background-image:linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] [background-size:20px_20px] opacity-5" />
        </div>

        {/* --- CONTENT --- */}
        <div className="flex flex-col items-center px-5 py-12 text-center md:px-8 md:py-24">
          <h1 className="mb-4 text-4xl leading-none font-black tracking-tighter text-black uppercase italic sm:text-5xl md:text-7xl">
            Something
            <br className="md:hidden" />
            _Broke
          </h1>

          <p className="mb-10 max-w-sm text-xs leading-tight font-bold text-black/40 uppercase md:mb-12 md:text-base">
            An unexpected error occurred while processing your request. Our
            systems are looking into it.
          </p>

          <div className="flex w-full max-w-xs flex-col items-center gap-6">
            {/* TRY AGAIN BUTTON */}
            <button
              onClick={() => reset()}
              className={cn(
                "group flex w-full items-center justify-center gap-3 border-4 border-black bg-[#A3E635] py-5 text-lg font-black tracking-tighter uppercase italic transition-all md:py-6 md:text-xl",
                "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
              )}
            >
              <RotateCcw className="h-5 w-5 stroke-[3px] transition-transform duration-500 group-active:rotate-180 md:h-6 md:w-6" />
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

        {/* BOTTOM DECOR - Adjusted for mobile visibility */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-[0.03] md:-right-4 md:-bottom-4 md:opacity-5">
          <span className="text-7xl font-black italic md:text-9xl">
            ERROR_500
          </span>
        </div>
      </div>
    </div>
  );
}
