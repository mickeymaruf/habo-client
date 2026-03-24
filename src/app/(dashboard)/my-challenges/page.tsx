import { participationService } from "@/services/participation.service";
import DashboardHeader from "./_components/dashboard-header";
import TaskList from "./_components/task-list";
import ChallengeCard from "../challenges/_components/challenge-card";

export default async function MyChallengesPage() {
  const { data: participations } =
    await participationService.getMyParticipations();

  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        <DashboardHeader />
        <TaskList participations={participations.data} />
      </div>

      {/* make a title or header section */}
      <div className="mt-20 mb-10">
        <h2 className="text-2xl font-bold">My Challenges</h2>
        <p className="text-gray-500">
          Here are the challenges you're participating in.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {participations.data.map((c) => (
          <ChallengeCard key={c.id} challengeData={c.challenge} />
        ))}
      </div>
    </div>
  );
}
