import { ArrowUpRight, Calendar, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Challenge } from "@/types/challenge.type";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChallengeWithoutParticipation } from "@/types/participation.types";

export default function ChallengeCard({
  challenge,
}: {
  challenge: ChallengeWithoutParticipation;
}) {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-[40px] border-none bg-[#C3B5FD] shadow-lg">
      <CardContent className="flex h-full flex-col">
        {/* Top Row */}
        <div className="mb-10 flex items-start justify-between">
          {/* <div className="mb-6">
            <h3 className="mb-3 font-bold text-black">People doing this</h3>
            <div className="flex h-10 -space-x-3">
              {challenge.participations.map((p) => (
                <Avatar key={p.userId} className="h-10 w-10 shadow-sm">
                  {p.user?.image ? (
                    <AvatarImage src={p.user.image} />
                  ) : (
                    <AvatarFallback
                      className="flex items-center justify-center font-bold text-white"
                      style={{
                        backgroundColor: `hsl(${
                          ((p.user?.name?.charCodeAt(0) || 0) * 37) % 360
                        }, 70%, 50%)`,
                      }}
                    >
                      {p.user?.name ? p.user.name[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              ))}

              {challenge._count?.participations >
                challenge.participations.length && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-black text-xs font-bold text-white">
                  +
                  {challenge._count.participations -
                    challenge.participations.length}
                </div>
              )}
            </div>
          </div> */}

          <Link href={`/participations/${challenge.id}`}>
            <div className="cursor-pointer rounded-full bg-white p-4 shadow-sm transition-transform hover:scale-105">
              <ArrowUpRight className="h-6 w-6 text-black" />
            </div>
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-black">
              {challenge.title}
            </h2>
            {challenge.isPremium && <Lock className="h-4 w-4 opacity-60" />}
          </div>
          <p className="font-medium text-black/70">{challenge.description}</p>
        </div>

        {/* Bottom */}
        <div className="mt-auto flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
              <Calendar className="h-4 w-4" />
              {challenge.durationDays} Days
            </div>
            <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
              {challenge.category}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end">
            <button className="flex items-center gap-1 text-sm font-bold text-black hover:underline">
              See details <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
