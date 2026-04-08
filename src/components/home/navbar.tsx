"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-black bg-white md:border-b-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <h1 className="font-mono text-2xl leading-none font-black tracking-tighter text-black uppercase italic md:text-4xl">
            HABO<span className="text-[#A3E635]">.</span>
          </h1>
          <div className="hidden h-1.5 w-10 -skew-x-12 border-x-2 border-black bg-[#A3E635] opacity-0 transition-opacity group-hover:opacity-100 md:block" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 text-sm font-black tracking-widest uppercase lg:flex">
          <NavLink href="/about">About_</NavLink>
          <NavLink href="/#features">Features_</NavLink>
          <NavLink href="/blog">Blogs_</NavLink>
          <NavLink href="/contact">Contact_</NavLink>
        </div>

        {/* CTA & MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          <Link href="/challenges" className="hidden sm:block">
            <button className="border-4 border-black bg-black px-4 py-2 text-[10px] font-black text-[#A3E635] uppercase shadow-[3px_3px_0px_0px_rgba(163,230,53,1)] transition-all hover:translate-y-0.5 hover:shadow-none active:scale-95 md:px-6 md:py-2.5 md:text-xs md:shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]">
              Access_Challenges
            </button>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center border-4 border-black bg-[#A3E635] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none lg:hidden"
          >
            {isOpen ? (
              <X size={24} strokeWidth={3} />
            ) : (
              <Menu size={24} strokeWidth={3} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "absolute left-0 w-full border-b-4 border-black bg-white transition-all duration-300 ease-in-out lg:hidden",
          isOpen ? "top-[100%] opacity-100" : "top-[-400%] opacity-0",
        )}
      >
        <div className="flex flex-col gap-4 p-6 text-xl font-black tracking-widest uppercase">
          <Link
            href="/challenges"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#A3E635]"
          >
            Challenges_
          </Link>
          <Link
            href="#features"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#A3E635]"
          >
            Features_
          </Link>
          <Link
            href="/leaderboard"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#A3E635]"
          >
            Leaderboard_
          </Link>
          <Link
            href="/challenges"
            className="sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            <button className="w-full border-4 border-black bg-black py-4 text-sm font-black text-[#A3E635] uppercase shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]">
              Access_Challenges
            </button>
          </Link>
        </div>
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
