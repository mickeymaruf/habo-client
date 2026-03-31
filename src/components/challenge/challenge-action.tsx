"use client";

import { deleteChallenge, updateChallenge } from "@/actions/challenge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "@/types/auth.types";
import { Challenge } from "@/types/challenge.type";
import {
  Trash2,
  Star,
  Ban,
  MoreVertical,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { leaveChallenge } from "@/actions/participation";

export default function ChallengeAction({
  challenge,
  user,
}: {
  challenge: Challenge;
  user: User;
}) {
  const router = useRouter();
  const isAdmin = user.role === "ADMIN";
  const isCreator = user.id === challenge.creatorId;

  const handleToggleFeatured = async () => {
    try {
      await updateChallenge(challenge.id, { featured: !challenge.featured });
      toast.success(
        challenge.featured ? "Removed featured" : "Marked as featured",
      );
      router.refresh();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleLeave = async () => {
    if (confirm("Are you sure you want to leave?")) {
      try {
        await leaveChallenge(challenge.id);
        toast.success("You have left the challenge");
        router.push("/participations");
      } catch (error) {
        toast.error("Couldn't leave");
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Permanently delete this challenge? This cannot be undone.")) {
      try {
        await deleteChallenge(challenge.id);
        toast.success("Challenge deleted");
        router.push("/challenges");
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* TRIGGER: Styled as a matching sticker */}
        <Button
          variant="ghost"
          size="icon"
          className="group relative z-20 h-12 w-12 rotate-2 rounded-xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-0 hover:bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95"
        >
          <MoreVertical className="h-6 w-6 stroke-[3px] text-black" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-[24px] border-4 border-black bg-white p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        {/* ADMIN SECTION */}
        {isAdmin && (
          <>
            <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
              <ShieldAlert className="h-3 w-3" /> Admin Ops
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleToggleFeatured}
              className="flex cursor-pointer items-center gap-2 rounded-xl py-3 font-black italic transition-colors focus:bg-[#A3E635] focus:text-black"
            >
              <Star
                className={`h-4 w-4 stroke-[3px] ${challenge.featured ? "fill-black" : ""}`}
              />
              {challenge.featured ? "UNFEATURE" : "FEATURE THIS"}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-xl py-3 font-black text-orange-600 italic focus:bg-orange-100">
              <Ban className="h-4 w-4 stroke-[3px]" />
              BAN CHALLENGE
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2 h-1 bg-black/5" />
          </>
        )}

        <DropdownMenuLabel className="px-2 py-2 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
          Options
        </DropdownMenuLabel>

        <DropdownMenuItem
          onClick={handleLeave}
          className="flex cursor-pointer items-center gap-2 rounded-xl py-3 font-black text-black italic focus:bg-zinc-100"
        >
          <LogOut className="h-4 w-4 stroke-[3px]" />
          LEAVE CHALLENGE
        </DropdownMenuItem>

        {isCreator && (
          <div className="mt-2">
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-black px-3 py-3 font-black text-[#A3E635] italic focus:bg-red-600 focus:text-white"
            >
              <Trash2 className="h-4 w-4 stroke-[3px]" />
              TERMINATE
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
