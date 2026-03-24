import { challengeService } from "@/services/challenge.service";
import ChallengeCard from "./_components/challenge-card";
import { Challenge } from "@/types/challenge.type";

export default async function ChallengesPage() {
  const { data } = await challengeService.getAllChallenges<Challenge[]>();

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {data.map((c) => (
        <ChallengeCard key={c.id} challenge={c} />
      ))}
    </div>
  );
}
