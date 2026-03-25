import { notFound } from "next/navigation";
import { challengeService } from "@/services/challenge.service";
import { Challenge } from "@/types/challenge.type";
import { Calendar, Lock, ArrowLeft, Sparkles, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { JoinChallengeButton } from "./_components/join-challenge-button";
import { authService } from "@/services/auth.service";
import ChallengeAction from "../../../../components/challenge/challenge-action";
import { Button } from "@/components/ui/button";
import { CanceledBanner } from "@/components/payment/cancel-banner";

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

  // Logic to check if we should show the paywall
  const hasJoined = challenge.participations.some(
    (p) => p.userId === session.user.id,
  );
  const showPaywall = challenge.isPremium && !hasJoined;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {isCanceled && <CanceledBanner />}

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
        <ChallengeAction user={session.user} challenge={challenge} />
      </div>

      <div className="relative overflow-hidden rounded-4xl bg-white px-6 py-8">
        {challenge.featured && (
          <div className="absolute top-0 right-0 z-20">
            <div className="translate-x-10 translate-y-4 rotate-45 bg-yellow-400 px-10 py-1 text-[10px] font-black tracking-widest text-black uppercase shadow-sm">
              Featured
            </div>
          </div>
        )}

        {/* Header - Stay Visible */}
        <div className="mb-6 space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            {challenge.title}
          </h1>

          <p className="max-w-[95%] leading-relaxed font-medium text-black/70">
            {challenge.description}
          </p>
        </div>

        {/* EVERYTHING BELOW THIS IS BLURRED IF PREMIUM */}
        <div className="relative">
          <div
            className={
              showPaywall
                ? "pointer-events-none opacity-50 blur-sm transition-all select-none"
                : ""
            }
          >
            {/* Info Pills */}
            <div className="mb-6 flex flex-wrap gap-3">
              {challenge.featured && (
                <div className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-black tracking-wider text-amber-950 uppercase shadow-[0_2px_10px_rgba(251,191,36,0.2)]">
                  <Sparkles className="h-4 w-4 fill-amber-950" />
                  Featured
                </div>
              )}
              {challenge.isPremium && (
                <div className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-[11px] font-black tracking-wider text-white uppercase shadow-sm">
                  <Lock className="h-3.5 w-3.5 fill-white/20" />
                  Premium
                </div>
              )}
              <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
                <Calendar className="h-4 w-4" /> {challenge.durationDays} Days
              </div>
              <div className="flex items-center gap-2 rounded-full bg-black/90 px-5 py-2.5 text-sm font-medium text-white">
                {challenge.category}
              </div>
            </div>

            {/* Join Button (Original location, blurred) */}
            <div className="mb-8">
              <JoinChallengeButton
                challengeId={challenge.id}
                isPremium={challenge.isPremium}
                initialHasJoined={hasJoined}
              />
            </div>

            {/* Participants */}
            <div className="my-10">
              <h3 className="mb-3 font-bold text-black">People doing this</h3>
              <div className="flex items-center gap-2">
                {challenge.participations.map((p) => (
                  <Avatar
                    key={p.userId}
                    className="h-12 w-12 border border-slate-100"
                  >
                    {p.user?.image ? (
                      <AvatarImage src={p.user.image} />
                    ) : (
                      <AvatarFallback
                        className="flex items-center justify-center text-sm font-bold text-white"
                        style={{
                          backgroundColor: `hsl(${((p.user?.name?.charCodeAt(0) || 0) * 37) % 360}, 70%, 50%)`,
                        }}
                      >
                        {p.user?.name ? p.user.name[0].toUpperCase() : "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ))}
                {challenge._count?.participations >
                  challenge.participations.length && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500">
                    +
                    {challenge._count.participations -
                      challenge.participations.length}
                  </div>
                )}
              </div>
            </div>

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

            {/* Reviews */}
            <div className="mb-6">
              <h3 className="mb-2 font-bold text-black">Reviews</h3>
              <div className="space-y-2 font-medium text-black/70">
                <p>🔥 This challenge actually helped me stay consistent.</p>
                <p>💪 Tough but rewarding.</p>
                <p>⚡ Seeing others progress keeps me going.</p>
              </div>
            </div>
          </div>

          {/* THE PAYWALL OVERLAY */}
          {showPaywall && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 pt-10">
              <div className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-black">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Premium Content</h3>
                <p className="mb-8 text-sm font-medium text-black/50">
                  Join this premium challenge to unlock the roadmap, daily
                  tracking, and community stats.
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
  );
}
