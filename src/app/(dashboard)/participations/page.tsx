import { participationService } from "@/services/participation.service";
import DashboardHeader from "./_components/dashboard-header";
import CheckList from "./_components/check-list";
import ChallengeCard from "./_components/challenge-card";
import { Participation } from "@/types/participation.types";

export default async function MyChallengesPage() {
  const { data: participations } =
    await participationService.getMyParticipations<Participation[]>();

  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        <DashboardHeader />
        <CheckList participations={participations} />
      </div>

      {/* make a title or header section */}
      <div className="mt-20 mb-10">
        <h2 className="text-2xl font-bold">My Challenges</h2>
        <p className="text-gray-500">
          Here are the challenges you're participating in.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {participations.map((c) => (
          <ChallengeCard key={c.id} challenge={c.challenge} />
        ))}
      </div>
    </div>
  );
}
