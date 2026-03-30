import { ArrowLeft, Home, TriangleAlert, Ghost } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ChallengeNotFound() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-20 md:px-0">
      {/* Main Content Card */}
      <div className="relative overflow-hidden rounded-[30px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] md:rounded-[50px] md:shadow-[12px_12px_0px_0px_rgba(239,68,68,1)]">
        {/* --- TOP BANNER ACCENT (High-Alert Red) --- */}
        <div className="relative flex h-24 w-full items-center justify-between overflow-hidden border-b-4 border-black bg-[#EF4444] px-4 md:h-28 md:px-8">
          {/* Back Button Sticker */}
          <Link
            href="/challenges"
            className="group relative z-20 -rotate-2 transition-transform hover:rotate-0 active:scale-95"
          >
            <div className="flex items-center gap-2 rounded-xl border-4 border-black bg-white px-3 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:px-5 md:py-2">
              <ArrowLeft className="h-4 w-4 stroke-[4px] text-black md:h-5 md:w-5" />
              <span className="text-[10px] font-black tracking-tighter text-black uppercase italic md:text-sm">
                Back to Feed
              </span>
            </div>
          </Link>

          {/* Background Texture Pattern */}
          <div className="absolute inset-0 z-0 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
        </div>

        {/* Content Section */}
        <div className="relative flex flex-col items-center px-5 pt-16 pb-20 text-center md:px-8 md:pt-20 md:pb-24">
          {/* Big Visual Icon - Red Glow Style */}
          <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] md:h-32 md:w-32">
            <Ghost className="h-12 w-12 stroke-[3px] text-[#EF4444] md:h-16 md:w-16" />
            {/* Small floating warning icon */}
            <div className="absolute -top-2 -right-2 rounded-full border-2 border-black bg-white p-1">
              <TriangleAlert className="h-5 w-5 fill-[#EF4444] text-black" />
            </div>
          </div>

          {/* Header Message */}
          <div className="mb-10 space-y-4">
            <h1 className="text-4xl leading-none font-black tracking-tighter text-black uppercase italic md:text-7xl">
              Not_found
            </h1>
            <p className="mx-auto max-w-sm text-base leading-tight font-bold text-black/40 uppercase md:text-lg">
              We tracked the signal, but there&apos;s nothing here. This mission
              has either been deleted or never existed.
            </p>
          </div>

          {/* Call to Action - Black/Red Contrast */}
          <Link
            href="/challenges"
            className={cn(
              "group relative flex w-full max-w-xs items-center justify-center gap-3 border-4 border-black py-6 text-xl font-black tracking-tighter uppercase italic transition-all",
              "bg-black text-white hover:bg-[#EF4444] hover:text-white",
              "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
            )}
          >
            <Home className="h-6 w-6 stroke-[3px]" />
            Return to Safety
          </Link>

          {/* Subtle watermark */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 opacity-[0.03] select-none">
            <span className="text-9xl font-black tracking-[0.2em] italic">
              EMPTY_CELL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
