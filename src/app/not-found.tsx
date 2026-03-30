"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-white px-4">
      {/* --- BACKGROUND WATERMARK --- */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <h1 className="text-[30vw] leading-none font-black italic select-none">
          LOST
        </h1>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Massive Error Code */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-black tracking-tighter text-black sm:text-[12rem]">
            404
          </h1>
          {/* Slanted "Broken" Badge */}
          <div className="absolute top-1/2 -right-4 -rotate-12 border-4 border-black bg-[#A3E635] px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black tracking-widest text-black uppercase">
              Page_Not_Found
            </p>
          </div>
        </div>

        {/* Minimalist Message */}
        <div className="mb-12 space-y-2 text-center">
          <h2 className="text-3xl font-black tracking-tighter text-black uppercase italic">
            You&apos;ve gone off-track.
          </h2>
          <p className="max-w-[280px] text-sm font-bold tracking-tight text-black/40 uppercase">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        {/* Primary Action */}
        <Link
          href="/"
          className="group relative flex items-center gap-4 border-4 border-black bg-black px-10 py-6 text-xl font-black tracking-tighter text-white uppercase italic transition-all hover:bg-[#A3E635] hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:scale-95"
        >
          <ArrowLeft className="h-6 w-6 stroke-[3px] transition-transform group-hover:translate-x-1" />
          Return to Home
        </Link>

        {/* Secondary Action */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-black/30 uppercase transition-colors hover:text-black"
        >
          Go Back
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* --- CORNER DECOR --- */}
      <div className="absolute bottom-10 left-10 hidden border-l-4 border-black pl-4 lg:block">
        <p className="text-[10px] font-black text-black/20 uppercase">
          Error_Code: 0x404
        </p>
        <p className="text-[10px] font-black text-black/20 uppercase">
          Status: Terminal
        </p>
      </div>
    </div>
  );
}
