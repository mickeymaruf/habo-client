import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-white py-12 md:border-t-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 text-center md:flex-row md:gap-8 md:text-left">
        <div>
          <p className="text-sm font-bold tracking-widest text-black uppercase">
            © 2026 HABO // Build Better Habits Together
          </p>
          <p className="mx-auto mt-4 max-w-md text-xs font-medium tracking-wide text-black/60 md:mx-0 md:mt-2">
            Join challenges, stay accountable, track your streaks, and grow with
            a community committed to better daily habits.
          </p>
        </div>

        {/* Navigation Links - Stacked on small, inline on medium+ */}
        <div className="flex flex-col flex-wrap justify-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase sm:flex-row sm:gap-6 md:justify-end">
          <span className="cursor-pointer text-black transition-colors hover:text-[#A3E635]">
            Challenges
          </span>
          <span className="cursor-pointer text-black transition-colors hover:text-[#A3E635]">
            Leaderboard
          </span>
          <span className="cursor-pointer text-black transition-colors hover:text-[#A3E635]">
            Premium
          </span>
          <span className="cursor-pointer text-black transition-colors hover:text-[#A3E635]">
            Support
          </span>
        </div>
      </div>
    </footer>
  );
}
