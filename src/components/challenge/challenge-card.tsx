import { ArrowUpRight, Calendar, Lock, Users2, User } from "lucide-react";
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
  // Filter out the current user from the general list to avoid double-showing
  const otherParticipants = challenge.participations.filter(
    (p) => p.userId !== currentUserId,
  );

  return (
    <Card className="group relative w-full overflow-hidden rounded-[40px] border-4 border-black bg-white transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="flex h-full flex-col p-8">
        {/* Category & Status Tags */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {challenge.featured && (
            <span className="rounded-full border-2 border-black bg-[#A3E635] px-3 py-1 text-[9px] font-black uppercase italic">
              FEATURED
            </span>
          )}

          {!isJoined && challenge.isPremium && (
            <div className="flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-black">
              <Lock className="h-3 w-3 stroke-[3px]" />
              <span className="text-[9px] font-black uppercase italic">
                PREMIUM
              </span>
            </div>
          )}

          <span className="rounded-full bg-black px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase">
            {challenge.category}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mb-8 space-y-3">
          <h3 className="text-2xl leading-tight font-black text-black decoration-3 underline-offset-4 group-hover:underline">
            {challenge.title}
          </h3>
          <p className="line-clamp-2 font-medium text-black/60">
            {challenge.description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold text-black">
            <Calendar className="h-4 w-4 stroke-[3px]" />
            <span className="text-sm">{challenge.durationDays} Days</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-black/20" />
          <div className="flex items-center gap-1.5 font-bold text-black">
            <Users2 className="h-4 w-4 stroke-[3px]" />
            <span className="text-sm">
              {challenge._count?.participations || 0} Joined
            </span>
          </div>
        </div>

        {/* Bottom Row: Avatars & Action */}
        <div className="mt-auto flex items-center justify-between border-t-2 border-black/5 pt-6">
          <div className="flex items-center -space-x-3">
            {/* Other Participants */}
            {otherParticipants.slice(0, isJoined ? 4 : 5).map((p) => (
              <Avatar
                key={p.userId}
                className="h-9 w-9 border-2 border-white shadow-sm"
              >
                {p.user?.image ? (
                  <AvatarImage src={p.user.image} />
                ) : (
                  <AvatarFallback
                    className="text-[10px] font-bold text-white"
                    style={{
                      backgroundColor: `hsl(${((p.user?.name?.charCodeAt(0) || 0) * 37) % 360}, 60%, 45%)`,
                    }}
                  >
                    {p.user?.name?.[0].toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            ))}

            {/* THE "YOU" INDICATOR: Only shows if joined */}
            {isJoined && (
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-black bg-[#A3E635] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] font-black text-black italic">
                  YOU
                </span>
              </div>
            )}

            {challenge._count && challenge._count?.participations > 3 && (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-black text-black">
                +{challenge._count.participations - 3}
              </div>
            )}
          </div>

          <Link href={`${redirectUrl}/${challenge.id}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#A3E635] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-12 active:scale-90">
              <ArrowUpRight className="h-6 w-6 stroke-[3px] text-black" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
