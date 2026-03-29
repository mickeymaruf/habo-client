"use client";

import {
  Search,
  Bell,
  LogOut,
  Settings,
  ShieldCheck,
  User as UserIcon,
  Zap,
  CornerDownLeft,
} from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/auth.types";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@/constants/user";
import Link from "next/link";

export default function DashboardNavbar({ user }: { user: User }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const performSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.push(`/challenges?${params.toString()}`);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(searchValue);
    }
  };

  return (
    <nav className="flex h-24 items-center justify-between border-b-4 border-black bg-white px-10">
      {/* Search - Command Style */}
      <div className="flex w-1/3 items-center">
        <div className="group relative w-full max-w-sm">
          <Search
            size={20}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 stroke-[3px] text-black transition-colors group-focus-within:text-black"
          />
          <Input
            ref={inputRef}
            type="search"
            placeholder="SEARCH MISSIONS..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            // Removed default ring and offset, enforced black border on focus
            className="h-12 border-4 border-black bg-white pr-24 pl-12 font-black tracking-tight italic transition-colors placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-search-cancel-button]:relative [&::-webkit-search-cancel-button]:right-2"
          />

          {/* THE "ENTER" BUTTON - Now clickable */}
          {searchValue.length > 0 && (
            <button
              onClick={() => performSearch(searchValue)}
              className="animate-in fade-in zoom-in absolute top-1/2 right-10 z-10 flex -translate-y-1/2 items-center gap-1.5 border-2 border-black bg-[#A3E635] px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] duration-200 active:translate-y-[-40%] active:shadow-none"
            >
              <span className="text-[9px] font-black tracking-tighter text-black uppercase italic">
                Enter
              </span>
              <CornerDownLeft className="h-3 w-3 stroke-[4px]" />
            </button>
          )}
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="group relative h-12 w-12 rounded-xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#A3E635] active:translate-y-1 active:shadow-none"
            >
              <Bell className="h-6 w-6 stroke-[2.5px] text-black transition-transform group-hover:rotate-12" />
              {/* The Alert Dot */}
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-black bg-red-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 rounded-[30px] border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              {/* Simple Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-black bg-[#A3E635]">
                <Zap className="h-6 w-6 stroke-[3px] text-black" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black tracking-tighter text-black uppercase italic">
                  Coming Soon
                </h3>
                <p className="text-[10px] leading-tight font-bold tracking-widest text-black/40 uppercase">
                  We are currently building this feature.
                </p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-10 w-[2px] bg-black/10" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-14 items-center gap-3 rounded-2xl border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(163,230,53,1)] transition-all hover:bg-zinc-50"
            >
              <Avatar className="h-8 w-8 border-2 border-black">
                {user?.image ? (
                  <AvatarImage src={user.image} />
                ) : (
                  <AvatarFallback className="bg-black text-xs font-black text-white">
                    {user?.name?.[0].toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-xs leading-none font-black text-black uppercase">
                  {user?.name}
                </p>
                <p className="text-[10px] font-bold text-black/40">
                  {user.role === UserRole.ADMIN ? "ADMIN_USER" : "USER"}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 rounded-[30px] border-4 border-black bg-white p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            align="end"
            forceMount
          >
            {/* User Profile Header */}
            <DropdownMenuLabel className="px-4 py-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-black tracking-tighter text-black uppercase italic">
                  {user?.name}
                </p>
                <p className="truncate text-[10px] font-bold text-black/40">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="mx-2 my-2 h-1 bg-black/5" />

            {/* Main Actions Group */}
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                asChild
                className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 font-black tracking-tighter text-black uppercase italic transition-colors focus:bg-[#A3E635] focus:text-black"
              >
                <Link href="/profile">
                  <UserIcon className="h-5 w-5 stroke-[3px]" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 font-black tracking-tighter text-black uppercase italic transition-colors focus:bg-[#A3E635] focus:text-black"
              >
                <Link href="/security">
                  <ShieldCheck className="h-5 w-5 stroke-[3px]" />
                  <span>Security</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="mx-2 my-2 h-1 bg-black/5" />

            {/* Logout Section */}
            <DropdownMenuItem
              onClick={() => {
                authClient.signOut();
                router.push("/login");
              }}
              className="flex cursor-pointer items-center gap-3 rounded-2xl bg-black px-4 py-3 font-black tracking-tighter text-[#A3E635] uppercase italic transition-all hover:scale-[0.98] focus:bg-red-600 focus:text-white"
            >
              <LogOut className="h-5 w-5 stroke-[3px]" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
