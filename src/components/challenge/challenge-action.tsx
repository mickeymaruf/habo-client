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
import { Trash2, Star, Ban, MoreVertical, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

  const handleLeave = async () => {
    if (
      confirm("Are you sure you want to leave? Your progress will be hidden.")
    ) {
      toast.success("You left the challenge");
      router.push("/challenges");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-slate-100"
        >
          <MoreVertical className="h-5 w-5 text-slate-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl p-2 shadow-xl"
      >
        {/* ADMIN SECTION */}
        {isAdmin && (
          <>
            <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Admin Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleToggleFeatured}
              className="flex cursor-pointer items-center gap-2 rounded-lg py-2.5"
            >
              <Star
                className={`h-4 w-4 ${challenge.featured ? "fill-amber-500 text-amber-500" : ""}`}
              />
              {challenge.featured ? "Remove Featured" : "Make Featured"}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg py-2.5 text-orange-600">
              <Ban className="h-4 w-4" />
              Ban Challenge
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
          </>
        )}

        {/* GENERAL SECTION */}
        <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          General
        </DropdownMenuLabel>

        <DropdownMenuItem
          onClick={handleLeave}
          className="flex cursor-pointer items-center gap-2 rounded-lg py-2.5 font-medium text-slate-700"
        >
          <LogOut className="h-4 w-4" />
          Leave Challenge
        </DropdownMenuItem>

        {isCreator && (
          <div className="mt-1 px-1 pb-1">
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 font-bold text-white focus:bg-red-700 focus:text-white"
            >
              <Trash2 className="h-4 w-4" />
              Delete Challenge
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
