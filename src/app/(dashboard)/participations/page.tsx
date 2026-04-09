import { participationService } from "@/services/participation.service";
import DashboardHeader from "./_components/dashboard-header";
import CheckList from "./_components/check-list";
import { Participation } from "@/types/participation.types";
import ChallengeCard from "../../../components/challenge/challenge-card";
import { authService } from "@/services/auth.service";

export default async function MyChallengesPage() {
  const session = await authService.getSession();
  const { data: participations } =
    await participationService.getMyParticipations<Participation[]>();

  return (
    <div className="px-4 pb-20 md:px-0">
      {/* Top Section: Briefing & Daily Log */}
      <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
        <DashboardHeader />
        <CheckList participations={participations} />
      </div>

      {/* --- SECTION HEADER: MY CHALLENGES --- */}
      <div className="mt-16 mb-8 flex flex-col items-start gap-2 md:mt-24 md:mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-3xl font-black tracking-tighter text-black uppercase italic md:text-4xl dark:text-white">
            Active Missions
          </h2>
          <span className="rounded-full border-2 border-black bg-[#A3E635] px-3 py-0.5 text-[9px] font-black text-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:text-[10px] dark:border-zinc-800">
            {participations.length} TOTAL
          </span>
        </div>
        <div className="h-1.5 w-24 bg-black md:w-32 dark:bg-[#A3E635]" />{" "}
        {/* Heavy Underline Accent */}
        <p className="mt-2 text-[10px] font-bold tracking-widest text-black/40 uppercase md:text-xs dark:text-zinc-500">
          Deployment overview and live challenge tracking.
        </p>
      </div>

      {/* Challenges Grid */}
      {participations.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
          {participations.map((c) => (
            <ChallengeCard
              key={c.id}
              challenge={c.challenge}
              redirectUrl="/participations"
              currentUserId={session.user.id}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[30px] border-4 border-dashed border-black/10 bg-zinc-50/50 py-20 text-center md:rounded-[40px] md:py-32 dark:border-zinc-800 dark:bg-zinc-900/30">
          <p className="text-lg font-black tracking-tighter text-black/20 uppercase italic md:text-xl dark:text-zinc-700">
            No active deployments detected.
          </p>
          <p className="mt-2 text-[9px] font-bold tracking-[0.2em] text-black/20 uppercase md:text-[10px] dark:text-zinc-700">
            Visit the feed to enlist.
          </p>
        </div>
      )}
    </div>
  );
}
