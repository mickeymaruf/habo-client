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
    <div className="pb-20">
      {/* Top Section: Briefing & Daily Log */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <DashboardHeader />
        <CheckList participations={participations} />
      </div>

      {/* --- SECTION HEADER: MY CHALLENGES --- */}
      <div className="mt-24 mb-12 flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-black tracking-tighter text-black uppercase italic">
            Active Missions
          </h2>
          <span className="rounded-full border-2 border-black bg-[#A3E635] px-3 py-0.5 text-[10px] font-black text-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {participations.length} TOTAL
          </span>
        </div>
        <div className="h-1.5 w-32 bg-black" /> {/* Heavy Underline Accent */}
        <p className="mt-2 text-xs font-bold tracking-widest text-black/40 uppercase">
          Deployment overview and live challenge tracking.
        </p>
      </div>

      {/* Challenges Grid */}
      {participations.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
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
        <div className="rounded-[40px] border-4 border-dashed border-black/10 bg-zinc-50/50 py-32 text-center">
          <p className="text-xl font-black tracking-tighter text-black/20 uppercase italic">
            No active deployments detected.
          </p>
          <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-black/20 uppercase">
            Visit the feed to enlist.
          </p>
        </div>
      )}
    </div>
  );
}
