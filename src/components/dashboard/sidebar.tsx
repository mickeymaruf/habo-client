"use client";

import {
  LayoutGrid,
  Calendar,
  ShieldCheck,
  Crown,
  ChartNoAxesCombined,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole as UserRoleType } from "@/types/enum.types";
import { UserRole } from "@/constants/user";

export default function Sidebar({ role }: { role: UserRoleType }) {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutGrid, label: "Challenges", href: "/challenges" },
    { icon: Calendar, label: "Participations", href: "/participations" },
    { icon: Crown, label: "Leaderboard", href: "/leaderboard" },
  ];

  if (role === UserRole.ADMIN) {
    navItems.push({
      icon: ChartNoAxesCombined,
      label: "Platform Stats",
      href: "/stats",
    });
  }

  return (
    <aside className="flex h-screen w-28 shrink-0 flex-col items-center border-r-4 border-black bg-white py-10">
      {/* Brand Section - High Contrast */}
      <div className="mb-12 text-center">
        <h1 className="font-mono text-3xl leading-none font-black tracking-tighter text-black uppercase italic">
          HABO
        </h1>
        <div className="mt-1 h-1.5 w-full border-x-2 border-black bg-[#A3E635]" />
      </div>

      {/* Nav Links */}
      <nav className="flex flex-1 flex-col gap-6">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <div key={item.label} className="group relative">
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "h-14 w-14 rounded-2xl border-4 transition-all duration-200 active:scale-90",
                  isActive
                    ? "border-black bg-[#A3E635] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "border-transparent text-zinc-700 hover:border-black hover:bg-zinc-100 hover:text-black",
                )}
              >
                <Link href={item.href}>
                  <item.icon
                    className={cn(
                      "h-6 w-6",
                      isActive ? "stroke-[3px]" : "stroke-[2px]",
                    )}
                  />
                </Link>
              </Button>

              {/* Tooltip on hover (Optional) */}
              <span className="absolute top-1/2 left-20 z-50 -translate-y-1/2 scale-0 rounded-lg border-2 border-black bg-black px-2 py-1 text-[10px] font-black text-white uppercase transition-all group-hover:scale-100">
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
