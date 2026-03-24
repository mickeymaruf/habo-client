import { Search, Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-4">
      <div className="flex w-1/3 items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search Activities"
            className="border-none bg-gray-50/50 pl-10 focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-orange-100">
            <AvatarImage src="/profile-placeholder.png" />
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
