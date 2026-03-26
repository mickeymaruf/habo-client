import { challengeService } from "@/services/challenge.service";
import { Challenge } from "@/types/challenge.type";
import { Plus, Sparkles, ArrowRight, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChallengeCard from "../../../components/challenge/challenge-card";

export default async function ChallengesPage() {
  const { data: challenges } =
    await challengeService.getAllChallenges<Challenge[]>();

  const featuredChallenges = challenges.filter((c) => c.featured);
  const regularChallenges = challenges.filter((c) => !c.featured);

  return (
    <div className="space-y-16 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-[50px] bg-black p-8 text-white md:p-12">
        <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
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
            className="h-20 rounded-[30px] bg-[#A3E635] px-10 text-xl font-black text-black shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all hover:scale-105 hover:bg-[#bef558] active:scale-95"
          >
            <Link href="/challenges/new" className="flex items-center gap-3">
              <Plus className="h-6 w-6 stroke-[4px]" />
              CREATE YOUR OWN
            </Link>
          </Button>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#A3E635]/10 blur-[100px]" />
      </section>

      {/* --- FEATURED SECTION (Horizontal) --- */}
      {featuredChallenges.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between px-4">
            <h2 className="flex items-center gap-3 text-3xl font-black tracking-tighter text-black uppercase italic">
              <Sparkles className="h-8 w-8 fill-[#A3E635] text-[#A3E635]" />
              The Spotlight
            </h2>
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-8 px-4 pt-2 pb-8">
              {featuredChallenges.map((c) => (
                <Link
                  key={c.id}
                  href={`/challenges/${c.id}`}
                  className="group relative h-[420px] w-[320px] shrink-0 overflow-hidden rounded-[45px] bg-zinc-900 p-8 transition-all hover:-translate-y-2 md:w-[380px]"
                >
                  {/* Background Accents */}
                  <div className="absolute top-0 right-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-[#C3B5FD]/20 blur-3xl transition-colors group-hover:bg-[#A3E635]/20" />

                  <div className="flex h-full flex-col justify-between">
                    <div className="space-y-4">
                      <span className="inline-block rounded-full border border-zinc-700 px-4 py-1.5 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                        {c.category}
                      </span>
                      <h3 className="text-3xl leading-none font-black whitespace-normal text-white group-hover:text-[#A3E635]">
                        {c.title}
                      </h3>
                      <p className="line-clamp-3 font-medium whitespace-normal text-zinc-500">
                        {c.description}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex -space-x-3">
                        {c.participations.slice(0, 4).map((p, i) => (
                          <div
                            key={i}
                            className="h-10 w-10 rounded-full border-4 border-zinc-900 bg-zinc-800"
                          />
                        ))}
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-zinc-900 bg-[#A3E635] text-[10px] font-black text-black">
                          {c._count?.participations}+
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-black text-white">
                          {c.durationDays} DAYS
                        </div>
                        <div className="rounded-full bg-white p-3 text-black transition-transform group-hover:rotate-45">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2 bg-zinc-100" />
          </ScrollArea>
        </section>
      )}

      {/* --- ALL CHALLENGES (Grid with specialized design) --- */}
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
