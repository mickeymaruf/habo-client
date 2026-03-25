"use client";

import {
  Search,
  Bell,
  LogOut,
  Settings,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
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
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user: User }) {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-4">
      <div className="flex w-1/3 items-center gap-4">
        <div className="relative w-full max-w-sm text-black">
          <Search
            size={22}
            className="absolute top-1/2 left-0 -translate-y-1/2"
          />
          <Input
            placeholder="Search Activities"
            className="border-0 bg-white pl-10 shadow-none ring-0 outline-none placeholder:text-black focus:border-0 focus:ring-0 focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        </Button>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full outline-none"
              >
                <Avatar key={user.id} className="h-10 w-10 shadow-sm">
                  {user?.image ? (
                    <AvatarImage src={user.image} />
                  ) : (
                    <AvatarFallback
                      className="flex items-center justify-center font-bold text-white"
                      style={{
                        backgroundColor: `hsl(${
                          ((user?.name?.charCodeAt(0) || 0) * 37) % 360
                        }, 70%, 50%)`,
                      }}
                    >
                      {user?.name ? user.name[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-semibold text-black">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-black/80">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  authClient.signOut();
                  router.push("/login");
                }}
                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
