"use client";

import { useState, useRef, useEffect } from "react";
import {
  LayoutGrid,
  Calendar,
  Crown,
  ChartNoAxesCombined,
  CreditCard,
  History,
  BanIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole as UserRoleType } from "@/types/enum.types";
import { UserRole } from "@/constants/user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Sidebar({ role }: { role: UserRoleType }) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);

  const navItems = [
    { icon: LayoutGrid, label: "Challenges", href: "/challenges" },
    { icon: Calendar, label: "Participations", href: "/participations" },
    { icon: Crown, label: "Leaderboard", href: "/leaderboard" },
    { icon: History, label: "History", href: "/history" },
  ];

  if (role === UserRole.ADMIN) {
    navItems.push(
      { icon: ChartNoAxesCombined, label: "Stats", href: "/stats" },
      { icon: CreditCard, label: "Payments", href: "/payments" },
      { icon: BanIcon, label: "Bans", href: "/bans" },
    );
  }

  // Handle dynamic arrow visibility
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        // Show top arrow if we've scrolled down at least 5px
        setShowTopArrow(scrollTop > 5);
        // Show bottom arrow if there's more than 5px left to scroll
        setShowBottomArrow(scrollHeight - scrollTop - clientHeight > 5);
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
      // Also check on window resize
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [navItems.length]);

  return (
    <>
      {/* DESKTOP SIDEBAR - Original Structure */}
      <aside className="hidden h-screen w-28 shrink-0 flex-col items-center border-r-4 border-black bg-white py-7 md:flex">
        <div className="mb-10 shrink-0 text-center">
          <h1 className="font-mono text-3xl leading-none font-black tracking-tighter text-black uppercase italic">
            HABO
          </h1>
          <div className="mt-1 h-1.5 w-full border-x-2 border-black bg-[#A3E635]" />
        </div>

        <div className="relative flex w-full flex-1 flex-col items-center overflow-hidden">
          {/* Dynamic Scroll Indicators */}
          {showTopArrow && (
            <ChevronUp className="absolute top-0 z-20 h-5 w-5 animate-bounce text-black" />
          )}
          {showBottomArrow && (
            <ChevronDown className="absolute bottom-2 z-20 h-5 w-5 animate-bounce text-black" />
          )}

          <nav
            ref={scrollRef}
            className="flex w-full flex-1 flex-col items-center gap-6 overflow-x-hidden overflow-y-auto pt-6 pb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <TooltipProvider delayDuration={0}>
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="ghost"
                        className={cn(
                          "h-14 w-14 shrink-0 rounded-2xl border-4 transition-all duration-200 active:scale-90",
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
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      sideOffset={20}
                      className="z-[100] rounded-lg border-2 border-black bg-black px-2 py-1 text-[10px] font-black text-white uppercase [&_svg]:hidden!"
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>
        </div>
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
