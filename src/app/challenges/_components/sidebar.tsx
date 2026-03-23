import {
  LayoutGrid,
  Calendar,
  MessageSquare,
  BarChart2,
  Zap,
  Trophy,
  LogOut,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Calendar, label: "Schedule" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Clock, label: "History" },
  { icon: Zap, label: "Stats" },
  { icon: Trophy, label: "Goals" },
];
export default function Sidebar() {
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
            {item.active && (
              <div className="absolute top-1/2 -left-4 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600" />
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-12 w-12 rounded-xl transition-all",
                item.active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-400 hover:bg-indigo-50 hover:text-indigo-600",
              )}
            >
              <item.icon className="h-5 w-5" />
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
