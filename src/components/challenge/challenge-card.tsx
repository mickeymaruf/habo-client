import {
  ArrowUpRight,
  Calendar,
  Lock,
  Users2,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Challenge } from "@/types/challenge.type";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChallengeCard({
  challenge,
  redirectUrl,
  currentUserId,
}: {
  challenge: Challenge;
  redirectUrl: string;
  currentUserId?: string;
}) {
  const isJoined = challenge.participations.some(
    (p) => p.userId === currentUserId,
  );

  const otherParticipants = challenge.participations.filter(
    (p) => p.userId !== currentUserId,
  );

  return (
    <Card className="group relative w-full overflow-hidden rounded-[40px] border-4 border-black bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="flex h-full flex-col p-8">
        {/* TOP TAGS: Brutalist Labels */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {challenge.featured && (
            <span className="rounded-full border-2 border-black bg-[#A3E635] px-3 py-1 text-[10px] font-black tracking-tighter uppercase italic">
              FEATURED
            </span>
          )}

          {challenge.isPremium && (
            <div className="flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-black">
              <Lock className="h-3 w-3 stroke-[3px]" />
              <span className="text-[10px] font-black tracking-tighter uppercase italic">
                PREMIUM
              </span>
            </div>
          )}

          <span className="ml-auto rounded-full bg-black px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase">
            {challenge.category}
          </span>
        </div>

        {/* TITLE & DESCRIPTION: Heavy Italic Tracking */}
        <div className="mb-6 space-y-3">
          <h3 className="text-3xl leading-none font-medium tracking-tighter text-black transition-colors group-hover:text-[#A3E635]">
            {challenge.title}
          </h3>
          <p className="line-clamp-2 text-sm font-bold text-black/70">
            {challenge.description}
          </p>
        </div>

        {/* THE STATS ROW: Votes and Comments integrated here */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border-2 border-black bg-zinc-50 p-3">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 stroke-[3px]" />
            <span className="text-xs font-black tabular-nums">
              {challenge.durationDays}D
            </span>
          </div>

          <div className="h-4 w-[2px] bg-black" />

          {/* Joined */}
          <div className="flex items-center gap-1.5">
            <Users2 className="h-4 w-4 stroke-[3px]" />
            <span className="text-xs font-black tabular-nums">
              {challenge._count?.participations || 0}
            </span>
          </div>

          <div className="h-4 w-[2px] bg-black" />

          {/* Votes */}
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="h-4 w-4 stroke-[3px]" />
            <span className="text-xs font-black tabular-nums">
              {challenge._count?.votes || 0}
            </span>
          </div>

          <div className="h-4 w-[2px] bg-black" />

          {/* Comments */}
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 stroke-[3px]" />
            <span className="text-xs font-black tabular-nums">
              {challenge._count?.comments || 0}
            </span>
          </div>
        </div>

        {/* BOTTOM ROW: Sticker Avatars & Action */}
        <div className="mt-auto flex items-center justify-between border-t-4 border-black pt-6">
          <div className="flex items-center -space-x-2">
            {otherParticipants.slice(0, 3).map((p) => (
              <Avatar
                key={p.userId}
                className="h-10 w-10 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {p.user?.image ? (
                  <AvatarImage src={p.user.image} />
                ) : (
                  <AvatarFallback className="bg-zinc-200 text-[10px] font-black">
                    {p.user?.name?.[0].toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            ))}

            {isJoined && (
              <div className="relative z-10 flex h-10 w-10 -rotate-6 items-center justify-center rounded-full border-2 border-black bg-[#A3E635] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-0">
                <span className="text-[10px] font-black text-black italic">
                  YOU
                </span>
              </div>
            )}
          </div>

          <Link href={`${redirectUrl}/${challenge.id}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#A3E635] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none">
              <ArrowUpRight className="h-6 w-6 stroke-[3px] text-black" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
