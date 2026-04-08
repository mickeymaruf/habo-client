import React from "react";
import Link from "next/link";
import { Terminal, Github, Twitter, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-white pt-16 pb-8 md:border-t-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* BRAND BLOCK */}
          <div className="md:col-span-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-black p-1 text-[#A3E635]">
                <Zap className="h-6 w-6 fill-current" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic">
                HABO<span className="text-[#A3E635]">.OS</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-tight font-bold text-black uppercase">
              The high-performance deployment system for personal discipline.
              Track streaks, upload intel, and dominate the leaderboard.
            </p>

            {/* SOCIAL STICKERS */}
            <div className="mt-6 flex gap-3">
              <a
                target="_blank"
                href="https://github.com/mickeymaruf/habo-client"
                className="border-2 border-black bg-white p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                target="_blank"
                href="https://twitter.com/mickeymaruf"
                className="border-2 border-black bg-white p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <div className="flex items-center gap-2 border-2 border-black bg-[#A3E635] px-3 py-1 text-[10px] font-black uppercase italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Terminal className="h-3 w-3" /> System_Online
              </div>
            </div>
          </div>

          {/* LINK GROUPS */}
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {/* OPERATIONS */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black tracking-[0.2em] text-black/30 uppercase">
                Operations
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-black uppercase italic">
                <li>
                  <Link
                    href="/challenges"
                    className="hover:text-[#A3E635] hover:underline"
                  >
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard"
                    className="hover:text-[#A3E635] hover:underline"
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="hover:text-[#A3E635] hover:underline"
                  >
                    Premium_Access
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-[#A3E635] hover:underline"
                  >
                    Read_Articles
                  </Link>
                </li>
              </ul>
            </div>

            {/* INTEL */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black tracking-[0.2em] text-black/30 uppercase">
                Intel
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-black uppercase italic">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#A3E635] hover:underline"
                  >
                    About_Habo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#A3E635] hover:underline"
                  >
                    Comm_Link
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-[#A3E635] hover:underline"
                  >
                    Support_Docs
                  </Link>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black tracking-[0.2em] text-black/30 uppercase">
                Protocols
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-black text-black/60 uppercase italic">
                <li>
                  <Link href="/legal" className="hover:text-black">
                    Privacy_Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-black">
                    Terms_Of_Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-black">
                    Cookie_Directives
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-16 flex flex-col items-center justify-between border-t-4 border-black pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-[10px] font-black tracking-widest text-black uppercase">
              © 2026 HABO // ALL RIGHTS RESERVED // STREAK_OR_DIE
            </p>
            {/* DEVELOPER SIGNATURE */}
            <a
              href="https://marufh.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase"
            >
              <span className="text-black/40 italic">Engineered By</span>
              <span className="bg-[#A3E635] px-2 py-0.5 text-black transition-all group-hover:bg-black group-hover:text-[#A3E635]">
                MARUF
              </span>
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4 md:mt-0">
            <div className="flex items-center gap-2 border-2 border-black bg-zinc-100 px-3 py-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#A3E635]" />
              <span className="text-[9px] font-black tracking-widest text-black/40 uppercase">
                v1.0.4-stable
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
