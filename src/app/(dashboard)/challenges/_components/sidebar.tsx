"use client";

import {
  LayoutGrid,
  Calendar,
  MessageSquare,
  Zap,
  Trophy,
  LogOut,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/challenges" },
  { icon: Calendar, label: "Schedule", href: "/my-challenges" },
  { icon: MessageSquare, label: "Messages", href: "/" },
  { icon: Clock, label: "History", href: "/" },
  { icon: Zap, label: "Stats", href: "/" },
  { icon: Trophy, label: "Goals", href: "/" },
];
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-24 shrink-0 flex-col items-center border-r border-gray-100 bg-white py-8">
      {/* Brand Section */}
      <div className="mb-14 text-center">
        <h1 className="text-xl leading-tight font-bold text-slate-900">Habo</h1>
        <p className="text-[10px] font-medium text-slate-400">Orely.co</p>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-1 flex-col gap-4">
        {navItems.map((item) => (
          <div key={item.label} className="group relative">
            {pathname === item.href && (
              <div className="absolute top-1/2 -left-4 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600" />
            )}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={cn(
                "h-12 w-12 rounded-xl transition-all",
                pathname === item.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-400 hover:bg-indigo-50 hover:text-indigo-600",
              )}
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <Button
        variant="ghost"
        size="icon"
        className="mt-auto text-gray-400 hover:text-red-500"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </aside>
  );
}
