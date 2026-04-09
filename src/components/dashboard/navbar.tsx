"use client";

import {
  Search,
  Bell,
  LogOut,
  ShieldCheck,
  User as UserIcon,
  Zap,
  CornerDownLeft,
  X,
  History,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function DashboardNavbar({ user }: { user: User }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // To handle click outside

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const [suggestions, setSuggestions] = useState<
    { id: string; title: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 1. Load History from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("recent_searches");
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // 2. Fix Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Suggestion Logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchValue.trim().length > 1) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/challenges/suggestions?search=${searchValue}`,
          );
          const result = await response.json();
          if (result.success) {
            setSuggestions(result.data);
          }
        } catch (error) {
          console.error("Suggestion fetch failed", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const saveToHistory = (term: string) => {
    if (!term.trim()) return;
    const newHistory = [
      term,
      ...searchHistory.filter((item) => item !== term),
    ].slice(0, 3); // Keep last 3 unique
    setSearchHistory(newHistory);
    localStorage.setItem("recent_searches", JSON.stringify(newHistory));
  };

  const performSearch = (term: string) => {
    saveToHistory(term);
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.push(`/challenges?${params.toString()}`);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") performSearch(searchValue);
  };

  return (
    <nav className="flex h-20 items-center justify-between gap-5 border-b-4 border-black bg-white px-4 md:h-24 md:px-10">
      {/* Search Container */}
      <div className="flex flex-1 items-center md:w-1/3" ref={containerRef}>
        <div className="group relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute top-1/2 left-3 z-10 -translate-y-1/2 stroke-[3px] text-black md:left-4 md:size-[20px]"
          />
          <Input
            ref={inputRef}
            type="text"
            placeholder="SEARCH CHALLENGES..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className={cn(
              "h-10 border-2 border-black bg-white pl-9 text-sm font-black tracking-tight italic placeholder:text-zinc-400 focus-visible:ring-0 md:h-12 md:border-4 md:pl-12",
              searchValue.length > 0 ? "pr-24 md:pr-32" : "pr-4",
            )}
          />

          {/* Suggestions & History Dropdown */}
          {showSuggestions &&
            (searchValue.length > 0 || searchHistory.length > 0) && (
              <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-full">
                <Command className="rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <CommandList className="max-h-[400px] overflow-y-auto">
                    {/* Recent History Section */}
                    {searchHistory.length > 0 && (
                      <CommandGroup
                        heading={
                          <span className="px-2 text-[10px] font-black text-zinc-400 uppercase">
                            Recent
                          </span>
                        }
                      >
                        {searchHistory.map((term, index) => (
                          <CommandItem
                            key={`hist-${index}`}
                            onSelect={() => {
                              setSearchValue(term);
                              performSearch(term);
                            }}
                            className="flex w-full cursor-pointer items-center px-4 py-3 text-sm font-black uppercase italic aria-selected:bg-[#A3E635]"
                          >
                            <History className="mr-3 h-4 w-4 stroke-[3px] text-zinc-400" />
                            {term}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}

                    {searchHistory.length > 0 && suggestions.length > 0 && (
                      <CommandSeparator className="bg-black/10" />
                    )}

                    {/* API Suggestions Section */}
                    {suggestions.length > 0 && (
                      <CommandGroup
                        heading={
                          <span className="px-2 text-[10px] font-black text-zinc-400 uppercase">
                            Suggestions
                          </span>
                        }
                      >
                        {suggestions.map((suggestion) => (
                          <CommandItem
                            key={suggestion.id}
                            onSelect={() => {
                              setSearchValue(suggestion.title);
                              performSearch(suggestion.title);
                            }}
                            className="flex w-full cursor-pointer items-center px-4 py-3 text-sm font-black uppercase italic aria-selected:bg-[#A3E635]"
                          >
                            <Search className="mr-3 h-4 w-4 stroke-[3px]" />
                            {suggestion.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </div>
            )}

          {/* Action Buttons */}
          {searchValue.length > 0 && (
            <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2 md:right-3 md:gap-3">
              <button
                type="button"
                onClick={() => setSearchValue("")}
                className="flex h-5 w-5 items-center justify-center border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-[#A3E635] active:translate-y-[2px] active:shadow-none md:h-6 md:w-6"
              >
                <X className="h-4 w-4 stroke-[4px]" />
              </button>

              <button
                type="button"
                onClick={() => performSearch(searchValue)}
                className="flex items-center gap-1 border-2 border-black bg-[#A3E635] px-1.5 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none md:gap-1.5 md:px-2"
              >
                <span className="text-[8px] font-black uppercase italic md:text-[9px]">
                  Enter
                </span>
                <CornerDownLeft className="h-3 w-3 stroke-[4px]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Actions - Original Logic */}
      <div className="flex items-center gap-3 md:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="group relative h-10 w-10 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#A3E635] active:translate-y-1 active:shadow-none md:h-12 md:w-12 md:rounded-xl md:border-4 md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Bell className="h-5 w-5 stroke-[2.5px] text-black md:h-6 md:w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-black bg-red-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:h-4 md:w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 rounded-[30px] border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-black bg-[#A3E635]">
                <Zap className="h-6 w-6 stroke-[3px] text-black" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black tracking-tighter text-black uppercase italic">
                  Coming Soon
                </h3>
                <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase">
                  Feature in progress
                </p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-[2px] bg-black/10 md:h-10" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-10 items-center gap-2 rounded-lg border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(163,230,53,1)] transition-all md:h-14 md:gap-3 md:rounded-2xl md:border-4 md:p-2 md:shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]"
            >
              <Avatar className="h-6 w-6 border-black md:h-8 md:w-8 md:border-2">
                {user?.image ? (
                  <AvatarImage src={user.image} />
                ) : (
                  <AvatarFallback className="bg-black text-[10px] font-black text-white md:text-xs">
                    {user?.name?.[0].toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-[10px] font-black text-black uppercase md:text-xs">
                  {user?.name}
                </p>
                <p className="text-[8px] font-bold text-black/40 md:text-[10px]">
                  {user.role === UserRole.ADMIN ? "ADMIN_USER" : "USER"}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 rounded-[30px] border-4 border-black bg-white p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            align="end"
          >
            <DropdownMenuLabel className="px-4 py-3 font-black text-black uppercase italic">
              {user?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-2 my-2 h-1 bg-black/5" />
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                asChild
                className="rounded-2xl px-4 py-3 font-black uppercase italic transition-colors focus:bg-[#A3E635]"
              >
                <Link href="/profile" className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 stroke-[3px]" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-2xl px-4 py-3 font-black uppercase italic transition-colors focus:bg-[#A3E635]"
              >
                <Link href="/security" className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 stroke-[3px]" /> Security
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-2 my-2 h-1 bg-black/5" />
            <DropdownMenuItem
              disabled={isLoggingOut}
              onSelect={(e) => {
                e.preventDefault();
              }}
              onClick={async () => {
                setIsLoggingOut(true);
                const toastId = toast.loading("TERMINATING_SESSION..."); // Immediate feedback

                try {
                  const { data, error } = await authClient.signOut();

                  if (error) {
                    toast.error(error.message, { id: toastId });
                    setIsLoggingOut(false);
                    return;
                  }

                  toast.success("SESSION_CLOSED", { id: toastId });
                  router.push("/login");
                  router.refresh();
                } catch (err) {
                  toast.error("LOGOUT_FAILED", { id: toastId });
                  setIsLoggingOut(false);
                }
              }}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-2xl bg-black px-4 py-3 font-black text-[#A3E635] uppercase italic transition-all",
                "focus:bg-red-600 focus:text-white",
                isLoggingOut && "opacity-50",
              )}
            >
              <LogOut
                className={cn(
                  "h-5 w-5 stroke-[3px]",
                  isLoggingOut && "animate-pulse",
                )}
              />
              {isLoggingOut ? "LOGGING_OUT..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
