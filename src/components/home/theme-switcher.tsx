"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* BRUTALIST BUTTON STYLE */}
        <button className="relative flex h-10 w-10 items-center justify-center border-4 border-black bg-white transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none dark:border-zinc-800 dark:bg-[#09090b] dark:text-zinc-100 dark:hover:shadow-[4px_4px_0px_0px_rgba(163,230,53,0.2)]">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>

      {/* BRUTALIST DROPDOWN CONTENT */}
      <DropdownMenuContent
        align="end"
        className="mt-2 rounded-none border-4 border-black bg-white p-0 font-mono font-black uppercase dark:border-zinc-800 dark:bg-[#09090b]"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer rounded-none border-b-2 border-black px-4 py-2 hover:bg-[#A3E635] hover:text-black focus:bg-[#A3E635] focus:text-black dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-[#A3E635] dark:hover:text-black"
        >
          Light_
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer rounded-none border-b-2 border-black px-4 py-2 hover:bg-[#A3E635] hover:text-black focus:bg-[#A3E635] focus:text-black dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-[#A3E635] dark:hover:text-black"
        >
          Dark_
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer rounded-none px-4 py-2 hover:bg-[#A3E635] hover:text-black focus:bg-[#A3E635] focus:text-black dark:text-zinc-100 dark:hover:bg-[#A3E635] dark:hover:text-black"
        >
          System_
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
