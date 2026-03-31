import { notFound } from "next/navigation";
import { challengeService } from "@/services/challenge.service";
import { Challenge } from "@/types/challenge.type";
import { Calendar, Lock, ArrowLeft, Sparkles, Users2 } from "lucide-react";
import Link from "next/link";
import { JoinChallengeButton } from "./_components/join-challenge-button";
import { authService } from "@/services/auth.service";
import ChallengeAction from "@/components/challenge/challenge-action";
import { cn } from "@/lib/utils";
import EngagementHub from "./_components/engagement";
import { UserRole } from "@/constants/user";
import PaymentToastHandler from "@/components/payment/payment-toast-handler";

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;

  const { data: challenge } =
    await challengeService.getSingleChallenge<Challenge>(id);
  const session = await authService.getSession();

  if (!challenge) return notFound();

  const hasJoined = challenge.isJoined;
  const hasAccess = challenge.hasAccess;
  const showPaywall = challenge.isPremium && !hasAccess;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-20 md:px-0">
      <PaymentToastHandler />

      {/* Main Content Card */}
      <div className="relative overflow-hidden rounded-[30px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:rounded-[50px] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        {/* --- TOP BANNER ACCENT --- */}
        <div
          className={cn(
            "relative flex h-24 w-full items-center justify-between overflow-hidden border-b-4 border-black px-4 md:h-28 md:px-8",
            challenge.featured ? "bg-yellow-400" : "bg-[#C3B5FD]",
          )}
        >
          {/* LEFT SIDE: Back Button Sticker */}
          <Link
            href="/challenges"
            className="group relative z-20 -rotate-2 transition-transform hover:rotate-0 active:scale-95"
          >
            <div className="flex items-center gap-2 rounded-xl border-4 border-black bg-white px-3 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:px-5 md:py-2">
              <ArrowLeft className="h-4 w-4 stroke-[4px] text-black md:h-5 md:w-5" />
              <span className="text-[10px] font-black tracking-tighter text-black uppercase italic md:text-sm">
                Go back
              </span>
            </div>
          </Link>

          {/* RIGHT SIDE: Action Dropdown Sticker */}
          {(hasJoined || session.user.role === UserRole.ADMIN) && (
            <div className="z-20 scale-90 md:scale-100">
              <ChallengeAction user={session.user} challenge={challenge} />
            </div>
          )}

          {/* Background Texture Pattern */}
          <div className="absolute inset-0 z-0 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        </div>

        <div className="relative px-5 pt-8 pb-10 md:px-8 md:pt-10 md:pb-12">
          {/* Header Section */}
          <div className="mb-8 space-y-4 md:mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-6">
              {challenge.featured && (
                <span className="rounded-full border-2 border-black bg-[#A3E635] px-3 py-1 text-[8px] font-black uppercase italic md:text-[9px]">
                  FEATURED
                </span>
              )}

              {challenge.isPremium && (
                <div className="flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-black">
                  <Lock className="h-3 w-3 stroke-[3px]" />
                  <span className="text-[8px] font-black uppercase italic md:text-[9px]">
                    PREMIUM
                  </span>
                </div>
              )}

              <span className="rounded-full bg-black px-3 py-1 text-[9px] font-black tracking-widest text-white uppercase md:px-4 md:text-[10px]">
                {challenge.category}
              </span>
            </div>

            <h1 className="text-3xl leading-none font-black tracking-tighter text-black uppercase italic sm:text-4xl md:text-6xl">
              {challenge.title}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed font-medium text-black/70 md:text-xl">
              {challenge.description}
            </p>
          </div>

          {/* Paywall Blurring Logic */}
          <div className="relative">
            <div
              className={cn(
                "space-y-8 transition-all duration-500 md:space-y-12",
                showPaywall
                  ? "pointer-events-none opacity-40 blur-md select-none"
                  : "",
              )}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col gap-1 rounded-3xl border-4 border-black p-5 md:p-6">
                  <Calendar className="h-5 w-5 stroke-[3px] text-black md:h-6 md:w-6" />
                  <span className="text-xl font-black md:text-2xl">
                    {challenge.durationDays} DAYS
                  </span>
                  <span className="text-[10px] font-bold text-black/50 uppercase">
                    Timeline
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl border-4 border-black bg-[#A3E635] p-5 md:p-6">
                  <Users2 className="h-5 w-5 stroke-[3px] text-black md:h-6 md:w-6" />
                  <span className="text-xl font-black md:text-2xl">
                    {challenge._count?.participations || 0}
                  </span>
                  <span className="text-[10px] font-bold text-black/50 uppercase">
                    Total Participants
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl border-4 border-black p-5 sm:col-span-2 md:col-span-1 md:p-6">
                  <Sparkles className="h-5 w-5 fill-white stroke-[3px] text-black md:h-6 md:w-6" />
                  <span className="text-xl font-black md:text-2xl">
                    {challenge.completedToday || 0}
                  </span>
                  <span className="text-[10px] leading-none font-bold text-black/70 uppercase">
                    Completed Today
                  </span>
                </div>
              </div>

              {/* Join Button Section */}
              <div className="mx-auto w-full max-w-md">
                <JoinChallengeButton
                  challengeId={challenge.id}
                  isPremium={challenge.isPremium}
                  initialHasJoined={hasJoined}
                  hasAccess={hasAccess}
                />
              </div>

              {/* --- ENGAGEMENT HUB (VOTING & COMMENTS) --- */}
              <EngagementHub
                challengeId={challenge.id}
                userId={session.user.id}
                votesCount={challenge._count?.votes}
                commentsCount={challenge._count?.comments}
                votedByMe={challenge.votedByMe}
              />
            </div>

            {/* THE BRUTALIST PAYWALL OVERLAY */}
            {showPaywall && (
              <div className="absolute inset-0 z-30 flex items-center justify-center p-4 pt-10">
                <div className="w-full max-w-sm rounded-[30px] border-4 border-black bg-white p-6 text-center shadow-[10px_10px_0px_0px_rgba(163,230,53,1)] md:max-w-md md:rounded-[40px] md:p-10 md:shadow-[15px_15px_0px_0px_rgba(163,230,53,1)]">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-[#A3E635] md:mb-6 md:h-20 md:w-20">
                    <Lock className="h-8 w-8 stroke-[3px] md:h-10 md:w-10" />
                  </div>
                  <h3 className="mb-2 text-2xl font-black tracking-tighter uppercase italic md:mb-3 md:text-3xl">
                    Premium Access
                  </h3>
                  <p className="mb-6 text-sm leading-tight font-bold text-black/60 md:mb-8 md:text-base">
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
