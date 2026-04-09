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
    <Card className="group relative w-full overflow-hidden rounded-[40px] border-4 border-black bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-[12px_12px_0px_0px_#27272a]">
      <CardContent className="flex h-full flex-col p-8">
        {/* TOP TAGS: Brutalist Labels */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {challenge.featured && (
            <span className="rounded-full border-2 border-black bg-[#A3E635] px-3 py-1 text-[10px] font-black tracking-tighter uppercase italic dark:border-zinc-800 dark:text-black">
              FEATURED
            </span>
          )}

          {challenge.isPremium && (
            <div className="flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              <Lock className="h-3 w-3 stroke-[3px]" />
              <span className="text-[10px] font-black tracking-tighter uppercase italic">
                PREMIUM
              </span>
            </div>
          )}

          <span className="rounded-full bg-black px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase dark:bg-zinc-800 dark:text-zinc-300">
            {challenge.category}
          </span>
        </div>

        {/* TITLE & DESCRIPTION: Heavy Italic Tracking */}
        <div className="mb-6 space-y-3">
          <h3 className="line-clamp-4 text-3xl leading-none font-medium tracking-tighter text-black transition-colors group-hover:text-[#A3E635] dark:text-white">
            {challenge.title}
          </h3>
          <p className="line-clamp-2 text-sm font-bold text-black/70 dark:text-zinc-500">
            {challenge.description}
          </p>
        </div>

        {/* THE STATS ROW: Votes and Comments integrated here */}
        <div className="mt-auto mb-8 flex flex-wrap items-center gap-4 rounded-xl bg-zinc-200/70 p-3 dark:bg-zinc-800/80">
          {/* Duration */}
          <div className="flex items-center gap-1.5 dark:text-zinc-300">
            <Calendar className="h-4 w-4 stroke-[3px]" />
            <span className="text-xs font-black tabular-nums">
              {challenge.durationDays}D
            </span>
          </div>

          <div className="h-4 w-[2px] bg-black dark:bg-zinc-700" />

          {/* Joined */}
          <div className="flex items-center gap-1.5 dark:text-zinc-300">
            <Users2 className="h-4 w-4 stroke-[3px]" />
            <span className="text-xs font-black tabular-nums">
              {challenge._count?.participations || 0}
            </span>
          </div>

          <div className="h-4 w-[2px] bg-black dark:bg-zinc-700" />

          {/* Votes */}
          <div className="flex items-center gap-1.5 dark:text-zinc-300">
            <ThumbsUp className="h-4 w-4 stroke-[3px]" />
            <span className="text-xs font-black tabular-nums">
              {challenge._count?.votes || 0}
            </span>
          </div>

          <div className="h-4 w-[2px] bg-black dark:bg-zinc-700" />

          {/* Comments */}
          <div className="flex items-center gap-1.5 dark:text-zinc-300">
            <MessageSquare className="h-4 w-4 stroke-[3px]" />
            <span className="text-xs font-black tabular-nums">
              {challenge._count?.comments || 0}
            </span>
          </div>
        </div>

        {/* BOTTOM ROW: Sticker Avatars & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center -space-x-2">
            {otherParticipants.slice(0, 3).map((p) => (
              <Avatar
                key={p.userId}
                className="h-10 w-10 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-zinc-800 dark:shadow-[2px_2px_0px_0px_#27272a]"
              >
                {p.user?.image ? (
                  <AvatarImage src={p.user.image} />
                ) : (
                  <AvatarFallback className="bg-zinc-200 text-[10px] font-black dark:bg-zinc-800 dark:text-zinc-500">
                    {p.user?.name?.[0].toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            ))}

            {isJoined && (
              <div className="relative z-10 flex h-10 w-10 -rotate-6 items-center justify-center rounded-full border-2 border-black bg-[#A3E635] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-0 dark:border-zinc-800 dark:shadow-[2px_2px_0px_0px_#27272a]">
                <span className="text-[10px] font-black text-black italic">
                  YOU
                </span>
              </div>
            )}
          </div>

          <Link href={`${redirectUrl}/${challenge.id}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#A3E635] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none dark:border-zinc-800 dark:shadow-[4px_4px_0px_0px_#27272a] dark:hover:shadow-[6px_6px_0px_0px_#27272a]">
              <ArrowUpRight className="h-6 w-6 stroke-[3px] text-black" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
