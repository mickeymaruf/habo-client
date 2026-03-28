import { challengeService } from "@/services/challenge.service";
import { Challenge } from "@/types/challenge.type";
import { Plus, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChallengeCard from "@/components/challenge/challenge-card";
import FeaturedChallengeCard from "@/components/challenge/featured-challenge-card";

export default async function ChallengesPage() {
  const { data: challenges } =
    await challengeService.getAllChallenges<Challenge[]>();

  const featuredChallenges = challenges.filter((c) => c.featured);
  const regularChallenges = challenges.filter((c) => !c.featured);

  return (
    <div className="space-y-16 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-[50px] bg-black p-8 text-white md:p-16">
        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-1 text-xs font-black text-black uppercase">
              <Zap className="h-3 w-3 fill-black" /> New Season
            </div>
            <h1 className="text-5xl font-black tracking-tighter italic md:text-7xl">
              LIMITLESS <br />{" "}
              <span className="text-[#A3E635]">CHALLENGES</span>
            </h1>
            <p className="max-w-md text-lg font-medium text-zinc-400">
              Don't just watch. Participate. Level up your consistency with our
              community-driven roadmaps.
            </p>
          </div>

          <Button
            asChild
            className="hover:bg-primary h-20 w-full border-4 border-black bg-[#A3E635] px-10 text-2xl font-black text-black transition-all hover:-translate-y-1 hover:text-[#A3E635] hover:shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] active:translate-y-1 lg:w-auto"
          >
            <Link href="/challenges/new" className="flex items-center gap-4">
              <Plus className="h-6 w-6 stroke-[4px]" />
              CREATE_NEW
            </Link>
          </Button>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#A3E635]/10 blur-[100px]" />
      </section>

      {/* --- SECTION 01: THE SPOTLIGHT (Horizontal) --- */}
      {featuredChallenges.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between px-4">
            <h2 className="flex items-center gap-3 text-3xl font-black tracking-tighter text-black uppercase italic">
              <Sparkles className="h-8 w-8 fill-[#A3E635] text-[#A3E635]" />
              The Spotlight
            </h2>
          </div>

          <ScrollArea className="w-full pb-6 whitespace-nowrap">
            <div className="flex w-max space-x-8 px-2 pt-2 pb-10">
              {featuredChallenges.map((c) => (
                <FeaturedChallengeCard key={c.id} c={c} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2 bg-zinc-100" />
          </ScrollArea>
        </section>
      )}

      {/* --- SECTION 02: ALL CHALLENGES (The Grid) --- */}
      <section className="space-y-8 px-4">
        <h2 className="text-3xl font-black tracking-tighter text-black uppercase italic">
          Explore All
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularChallenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} redirectUrl="/challenges" />
          ))}
        </div>
      </section>
    </div>
  );
}
