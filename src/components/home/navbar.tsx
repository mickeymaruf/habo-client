import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b-8 border-black bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <h1 className="font-mono text-4xl leading-none font-black tracking-tighter text-black uppercase italic">
            HABO<span className="text-[#A3E635]">.</span>
          </h1>
          <div className="h-1.5 w-10 -skew-x-12 border-x-2 border-black bg-[#A3E635] opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>

        <div className="flex items-center gap-6 text-sm font-black tracking-widest uppercase">
          <NavLink href="/challenges">Challenges_</NavLink>
          <NavLink href="#features">Features_</NavLink>
          <NavLink href="/leaderboard">Leaderboard_</NavLink>
        </div>

        <Link href="/challenges">
          <button className="border-4 border-black bg-black px-6 py-2.5 text-xs font-black text-[#A3E635] uppercase shadow-[4px_4px_0px_0px_rgba(163,230,53,1)] transition-all hover:translate-y-0.5 hover:shadow-none active:scale-95">
            Access_Challenges
          </button>
        </Link>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group relative overflow-hidden">
      {children}
      <div className="absolute bottom-0 left-0 h-1 w-full -translate-x-full bg-[#A3E635] transition-transform duration-300 group-hover:translate-x-0" />
    </Link>
  );
}
