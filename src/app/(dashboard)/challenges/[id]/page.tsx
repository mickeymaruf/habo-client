import { notFound } from "next/navigation";
import { challengeService } from "@/services/challenge.service";
import { Challenge } from "@/types/challenge.type";
import {
  Calendar,
  Lock,
  ArrowLeft,
  Sparkles,
  Zap,
  Users2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { JoinChallengeButton } from "./_components/join-challenge-button";
import { authService } from "@/services/auth.service";
import ChallengeAction from "@/components/challenge/challenge-action";
import { CanceledBanner } from "@/components/payment/cancel-banner";
import { cn } from "@/lib/utils";
import EngagementHub from "./_components/engagement";

export default async function ChallengePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const sParams = await searchParams;
  const isCanceled = sParams.canceled === "true";

  const { data: challenge } =
    await challengeService.getSingleChallenge<Challenge>(id);
  const session = await authService.getSession();

  if (!challenge) return notFound();

  const hasJoined = challenge.participations.some(
    (p) => p.userId === session.user.id,
  );
  const showPaywall = challenge.isPremium && !hasJoined;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 pb-20">
      {isCanceled && <CanceledBanner />}

      {/* Main Content Card */}
      <div className="relative overflow-hidden rounded-[50px] border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        {/* --- TOP BANNER ACCENT --- */}
        <div
          className={cn(
            "relative flex h-28 w-full items-center justify-between overflow-hidden border-b-4 border-black px-8",
            challenge.featured ? "bg-yellow-400" : "bg-[#C3B5FD]",
          )}
        >
          {/* LEFT SIDE: Back Button Sticker */}
          <Link
            href="/challenges"
            className="group relative z-20 -rotate-2 transition-transform hover:rotate-0 active:scale-95"
          >
            <div className="flex items-center gap-2 rounded-xl border-4 border-black bg-white px-5 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft className="h-5 w-5 stroke-[4px] text-black" />
              <span className="text-sm font-black tracking-tighter text-black uppercase italic">
                Back to Feed
              </span>
            </div>
          </Link>

          {/* RIGHT SIDE: Action Dropdown Sticker */}
          <ChallengeAction user={session.user} challenge={challenge} />

          {/* Background Texture Pattern */}
          <div className="absolute inset-0 z-0 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        </div>

        <div className="relative px-8 pt-10 pb-12">
          {/* Header Section */}
          <div className="mb-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-black px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                {challenge.category}
              </span>
              {challenge.featured && (
                <div className="flex items-center gap-1 rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-black uppercase">
                  <Sparkles className="h-3 w-3 fill-yellow-400" /> Featured
                </div>
              )}
            </div>

            <h1 className="text-5xl leading-none font-black tracking-tighter text-black uppercase italic md:text-6xl">
              {challenge.title}
            </h1>

            <p className="max-w-2xl text-xl leading-relaxed font-medium text-black/70">
              {challenge.description}
            </p>
          </div>

          {/* Paywall Blurring Logic */}
          <div className="relative">
            <div
              className={cn(
                "space-y-12 transition-all duration-500",
                showPaywall
                  ? "pointer-events-none opacity-40 blur-md select-none"
                  : "",
              )}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-1 rounded-3xl border-4 border-black p-6">
                  <Calendar className="h-6 w-6 stroke-[3px] text-black" />
                  <span className="text-2xl font-black">
                    {challenge.durationDays} DAYS
                  </span>
                  <span className="text-xs font-bold text-black/50 uppercase">
                    Timeline
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl border-4 border-black bg-[#A3E635] p-6">
                  <Users2 className="h-6 w-6 stroke-[3px] text-black" />
                  <span className="text-2xl font-black">
                    {challenge._count?.participations || 0}
                  </span>
                  <span className="text-xs font-bold text-black/50 uppercase">
                    Participants
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl border-4 border-black p-6">
                  <Zap className="h-6 w-6 stroke-[3px] text-black" />
                  <span className="text-2xl font-black">60%</span>
                  <span className="text-xs font-bold text-black/50 uppercase">
                    Avg. Progress
                  </span>
                </div>
              </div>

              {/* Reviews & Social Proof */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">
                  What they're saying
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {["🔥 Consistency hack!", "💪 Hard but worth it"].map(
                    (review, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-2xl border-2 border-black bg-zinc-50 p-4 font-bold italic"
                      >
                        <Star className="h-4 w-4 fill-black" /> "{review}"
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Join Button Section */}
              <div className="mx-auto max-w-md">
                <JoinChallengeButton
                  challengeId={challenge.id}
                  isPremium={challenge.isPremium}
                  initialHasJoined={hasJoined}
                />
              </div>

              {/* --- ENGAGEMENT HUB (VOTING & COMMENTS) --- */}
              <EngagementHub challengeId={challenge.id} />
            </div>

            {/* THE BRUTALIST PAYWALL OVERLAY */}
            {showPaywall && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pt-10">
                <div className="w-full max-w-md rounded-[40px] border-4 border-black bg-white p-10 text-center shadow-[15px_15px_0px_0px_rgba(163,230,53,1)]">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-[#A3E635]">
                    <Lock className="h-10 w-10 stroke-[3px]" />
                  </div>
                  <h3 className="mb-3 text-3xl font-black tracking-tighter uppercase italic">
                    Premium Access
                  </h3>
                  <p className="mb-8 leading-tight font-bold text-black/60">
                    This challenge includes private roadmaps, daily tracking
                    tools, and exclusive community stats.
                  </p>
                  <JoinChallengeButton
                    challengeId={challenge.id}
                    isPremium={true}
                    initialHasJoined={false}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
