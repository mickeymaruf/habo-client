"use client";

import { Button } from "@/components/ui/button";
import { DrawerTitle } from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChallengeData } from "@/types/challenge.type";
import { Users, Calendar } from "lucide-react";

export default function ChallengeDetails({
  challenge,
}: {
  challenge: ChallengeData;
}) {
  return (
    <div className="space-y-6">
      {/* Accessibility */}
      <VisuallyHidden>
        <DrawerTitle>{challenge.title}</DrawerTitle>
      </VisuallyHidden>

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">
          {challenge.title}
        </h2>

        <p className="max-w-[90%] leading-relaxed font-medium text-black/70">
          {challenge.description}
        </p>
      </div>

      {/* Info Pills (same as card) */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
          <Calendar className="h-4 w-4" />
          {challenge.durationDays} Days
        </div>

        <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
          {challenge.category}
        </div>
      </div>

      {/* Join Button (same style language) */}
      <Button className="h-12 w-full rounded-xl bg-[#A3E635] px-6 font-bold text-black shadow-md hover:bg-[#92d42d]">
        JOIN CHALLENGE <Users className="ml-2 h-5 w-5" />
      </Button>

      {/* Participants (same avatar style) */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-black">People doing this</h3>

        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <Avatar key={i} className="h-10 w-10 border-2 border-white">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ))}

          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-xs font-bold text-white">
            +12
          </div>
        </div>
      </div>

      {/* Progress (same color system) */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-black">
          Community Progress
        </h3>

        <div className="h-3 w-full overflow-hidden rounded-full bg-black/10">
          <div className="h-full w-[60%] rounded-full bg-black" />
        </div>

        <p className="mt-1 text-xs font-medium text-black/60">
          60% completed today
        </p>
      </div>

      {/* Reviews (same typography tone) */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-black">Reviews</h3>

        <div className="space-y-2 text-sm font-medium text-black/70">
          <p>🔥 This challenge actually helped me stay consistent.</p>
          <p>💪 Tough but rewarding.</p>
          <p>⚡ Seeing others progress keeps me going.</p>
        </div>
      </div>
    </div>
  );
}
