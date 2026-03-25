import { notFound } from "next/navigation";
import { challengeService } from "@/services/challenge.service";
import { Challenge } from "@/types/challenge.type";
import { Calendar, Lock, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ActivityGraph from "./_components/activity-graph";
import { participationService } from "@/services/participation.service";
import ActivityCalendar from "./_components/activity-calendar";
import CheckList from "../_components/check-list";
import ChallengeAction from "../../../../components/challenge/challenge-action";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: participation } =
    await participationService.getSingleParticipation<any>(id);
  const session = await authService.getSession();

  if (!participation) return notFound();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        {/* Back Button */}
        <Button
          size="icon"
          asChild
          className="flex cursor-pointer items-center gap-2 bg-transparent font-bold text-black duration-200 hover:-translate-x-2 hover:bg-blue-100"
        >
          <Link href="/challenges">
            <ArrowLeft className="h-5 w-5" /> Back
          </Link>
        </Button>

        {/* Actions Dropdown */}
        <ChallengeAction
          user={session.user}
          challenge={participation.challenge}
        />
      </div>

      <div className="my-8 space-y-3 rounded-4xl px-8">
        <CheckList participations={[participation]} />
      </div>

      <div className="rounded-4xl bg-white px-6 py-8">
        {/* Header */}
        <div className="mb-6 space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            {participation.challenge.title}
          </h1>
          <p className="max-w-[95%] leading-relaxed font-medium text-black/70">
            {participation.challenge.description}
          </p>
        </div>
        {/* Info Pills */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
            <Calendar className="h-4 w-4" />{" "}
            {participation.challenge.durationDays} Days
          </div>
          <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
            {participation.challenge.category}
          </div>
          {participation.challenge.isPremium && (
            <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
              <Lock className="h-4 w-4" /> Premium
            </div>
          )}
        </div>

        <p className="my-10 text-amber-700">
          Joined at {new Date(participation.joinedAt).toLocaleDateString()}
        </p>

        {/* Participants */}
        {/* <div className="mb-6">
          <h3 className="mb-3 font-bold text-black">People doing this</h3>
          <div className="flex -space-x-3">
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
        {/* Progress */}
        <div className="mb-6">
          <h3 className="mb-2 font-bold text-black">Community Progress</h3>
          <div className="h-3 w-full overflow-hidden rounded-full bg-black/10">
            <div className="h-full w-[60%] rounded-full bg-black" />
          </div>
          <p className="mt-1 text-sm font-medium text-black/60">
            60% completed today
          </p>
        </div>

        {/* My progress */}
        <div className="my-10 h-px w-full bg-black/10" />

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-black">My Progress</h3>
          <p className="text-black/70">
            Track your daily progress and stay motivated!
          </p>
        </div>
        <ActivityGraph
          joinedAt={participation.joinedAt}
          progressLogs={participation.progressLogs}
          durationDays={participation.challenge.durationDays}
        />
      </div>
    </div>
  );
}
