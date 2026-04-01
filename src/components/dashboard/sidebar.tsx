"use client";

import {
  LayoutGrid,
  Calendar,
  ShieldCheck,
  Crown,
  ChartNoAxesCombined,
  CreditCard,
  History,
  Ban,
  BanIcon,
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
    { icon: History, label: "History", href: "/history" },
  ];

  if (role === UserRole.ADMIN) {
    navItems.push(
      {
        icon: ChartNoAxesCombined,
        label: "Stats",
        href: "/stats",
      },
      {
        icon: CreditCard,
        label: "Payments",
        href: "/payments",
      },
      {
        icon: BanIcon,
        label: "Bans",
        href: "/bans",
      },
    );
  }

  return (
    <>
      {/* DESKTOP SIDEBAR - Original Structure */}
      <aside className="hidden h-screen w-28 shrink-0 flex-col items-center border-r-4 border-black bg-white py-7 md:flex">
        <div className="mb-12 text-center">
          <h1 className="font-mono text-3xl leading-none font-black tracking-tighter text-black uppercase italic">
            HABO
          </h1>
          <div className="mt-1 h-1.5 w-full border-x-2 border-black bg-[#A3E635]" />
        </div>

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
                <span className="absolute top-1/2 left-20 z-50 -translate-y-1/2 scale-0 rounded-lg border-2 border-black bg-black px-2 py-1 text-[10px] font-black text-white uppercase transition-all group-hover:scale-100">
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE FLOATING DOCK - Responsive Classes Only */}
      <div className="fixed bottom-6 left-0 z-50 flex w-full justify-center px-4 md:hidden">
        <div className="relative max-w-full overflow-hidden rounded-[32px] border-[3px] border-black bg-white/80 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.15),4px_4px_0px_0px_rgba(0,0,0,1)] backdrop-blur-md">
          {/* Scrollable Container */}
          <nav className="flex items-center gap-1 overflow-x-auto overflow-y-hidden px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-[22px] px-4 py-2.5 transition-all duration-300",
                    isActive ? "bg-black text-[#A3E635]" : "text-black/40",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "stroke-[2.5px]" : "stroke-[2px]",
                    )}
                  />
                  {isActive && (
                    <span className="text-[10px] font-black tracking-tight whitespace-nowrap uppercase">
                      {item.label.split(" ")[0]}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
