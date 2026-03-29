import { notFound } from "next/navigation";
import {
  Calendar,
  Lock,
  ArrowLeft,
  Zap,
  Users2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import ActivityGraph from "./_components/activity-graph";
import { participationService } from "@/services/participation.service";
import CheckList from "../_components/check-list";
import ChallengeAction from "@/components/challenge/challenge-action";
import { authService } from "@/services/auth.service";
import { SuccessBanner } from "@/components/payment/success-banner";
import { cn } from "@/lib/utils";

export default async function ChallengePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const sParams = await searchParams;
  const isSuccess = sParams.success === "true";

  const { data: participation } =
    await participationService.getSingleParticipation<any>(id);
  const session = await authService.getSession();

  // Handle the "Race Condition" (Paid but DB not updated yet)
  if (!participation && isSuccess) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center py-20 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A3E635] border-t-transparent" />
        <h2 className="mt-6 text-3xl font-black tracking-tighter uppercase italic">
          Verifying Mission Access...
        </h2>
        <p className="mt-2 text-xs font-bold tracking-widest text-black/60 uppercase">
          Finalizing encrypted payment data. Stand by.
        </p>
        <meta httpEquiv="refresh" content="3" />
      </div>
    );
  }

  if (!participation) return notFound();

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 pb-20">
      {isSuccess && <SuccessBanner />}

      {/* Main Participation Container */}
      <div className="relative overflow-hidden rounded-[50px] border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        {/* --- TOP BANNER ACCENT --- */}
        <div
          className={cn(
            "relative flex h-28 w-full items-center justify-between overflow-hidden border-b-4 border-black px-8",
            participation.challenge.featured ? "bg-yellow-400" : "bg-[#A3E635]",
          )}
        >
          {/* Back Button Sticker */}
          <Link
            href="/participations"
            className="group relative z-20 -rotate-2 transition-transform hover:rotate-0 active:scale-95"
          >
            <div className="flex items-center gap-2 rounded-xl border-4 border-black bg-white px-5 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft className="h-5 w-5 stroke-[4px] text-black" />
              <span className="text-sm font-black tracking-tighter text-black uppercase italic">
                Dashboard
              </span>
            </div>
          </Link>

          {/* Actions Dropdown */}
          <ChallengeAction
            user={session.user}
            challenge={participation.challenge}
          />

          {/* Background Texture Pattern */}
          <div className="absolute inset-0 z-0 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        </div>

        <div className="relative px-8 pt-10 pb-12">
          {/* Header Section */}
          <div className="mb-10 space-y-4">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {participation.challenge.featured && (
                <span className="rounded-full border-2 border-black bg-[#A3E635] px-3 py-1 text-[9px] font-black uppercase italic">
                  FEATURED
                </span>
              )}

              {participation.challenge.isPremium && (
                <div className="flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-black">
                  <Lock className="h-3 w-3 stroke-[3px]" />
                  <span className="text-[9px] font-black uppercase italic">
                    PREMIUM
                  </span>
                </div>
              )}

              <span className="rounded-full bg-black px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                {participation.challenge.category}
              </span>
            </div>

            <h1 className="text-5xl leading-none font-black tracking-tighter text-black uppercase italic md:text-6xl">
              {participation.challenge.title}
            </h1>

            <p className="max-w-2xl text-xl leading-relaxed font-medium text-black/70">
              {participation.challenge.description}
            </p>
          </div>

          {/* Task Log (Checklist) Section */}
          <div className="mb-12">
            <CheckList participations={[participation]} />
          </div>

          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-3xl border-4 border-black p-6">
                <Calendar className="h-6 w-6 stroke-[3px] text-black" />
                <span className="text-2xl font-black tracking-tighter uppercase">
                  {participation.challenge.durationDays} DAYS
                </span>
                <span className="text-xs font-bold text-black/50 uppercase">
                  Total Duration
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-3xl border-4 border-black bg-[#A3E635] p-6">
                <Users2 className="h-6 w-6 stroke-[3px] text-black" />
                <span className="text-2xl font-black">
                  {participation.challenge._count?.participations || 0}
                </span>
                <span className="text-xs font-bold text-black/50 uppercase">
                  Total Participants
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-3xl border-4 border-black p-6">
                <Users2 className="h-6 w-6 stroke-[3px] text-black" />
                <span className="text-2xl font-black tracking-tighter text-amber-700 uppercase italic">
                  {new Date(participation.joinedAt).toLocaleDateString(
                    undefined,
                    { month: "short", day: "numeric" },
                  )}
                </span>
                <span className="text-xs font-bold text-black/50 uppercase">
                  Joined At
                </span>
              </div>
            </div>

            {/* Activity Graph Section */}
            <div className="space-y-6">
              <div className="flex flex-col">
                <h3 className="text-3xl font-black tracking-tighter uppercase italic">
                  Mission Progress
                </h3>
                <p className="mt-1 text-xs font-bold tracking-widest text-black/40 uppercase">
                  Historical activity and consistency tracking.
                </p>
              </div>

              <div className="rounded-[35px] border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <ActivityGraph
                  joinedAt={participation.joinedAt}
                  progressLogs={participation.progressLogs}
                  durationDays={participation.challenge.durationDays}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
