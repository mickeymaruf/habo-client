import { challengeService } from "@/services/challenge.service";
import { Challenge } from "@/types/challenge.type";
import { Plus, Sparkles, Zap, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChallengeCard from "@/components/challenge/challenge-card";
import FeaturedChallengeCard from "@/components/challenge/featured-challenge-card";
import { authService } from "@/services/auth.service";

export default async function ChallengesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const session = await authService.getSession();
  const query = await searchParams;
  const isSearching = !!query.search;

  const { data: featuredChallenges } = await challengeService.getAllChallenges<
    Challenge[]
  >({
    featured: "true",
  });
  const { data: regularChallenges } = await challengeService.getAllChallenges<
    Challenge[]
  >({
    search: query.search,
    category: query.category,
  });

  return (
    <div className="space-y-12 pb-20 md:space-y-16">
      {/* --- HERO SECTION --- */}
      {!isSearching && (
        <section className="relative overflow-hidden rounded-[32px] bg-black p-6 text-white md:rounded-[50px] md:p-16">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-1 text-xs font-black text-black uppercase">
                <Zap className="h-3 w-3 fill-black" /> New Season
              </div>
              <h1 className="text-4xl font-black tracking-tighter italic sm:text-5xl md:text-7xl">
                LIMITLESS <br />{" "}
                <span className="text-[#A3E635]">CHALLENGES</span>
              </h1>
              <p className="max-w-md text-base font-medium text-zinc-400 md:text-lg">
                Don't just watch. Participate. Level up your consistency with
                our community-driven roadmaps.
              </p>
            </div>

            <Button
              asChild
              className="h-16 w-full border-4 border-black bg-[#A3E635] px-6 text-xl font-black text-black transition-all hover:-translate-y-1 hover:bg-[#A3E635] hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 md:h-20 md:px-10 md:text-2xl lg:w-auto"
            >
              <Link href="/challenges/new" className="flex items-center gap-4">
                <Plus className="h-6 w-6 stroke-[4px]" />
                CREATE_NEW
              </Link>
            </Button>
          </div>
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#A3E635]/10 blur-[100px]" />
        </section>
      )}

      {/* --- SPOTLIGHT --- */}
      {!isSearching && featuredChallenges.length > 0 && (
        <section className="space-y-6 md:space-y-8">
          <div className="flex items-center justify-between px-4">
            <h2 className="flex items-center gap-3 text-2xl font-black tracking-tighter text-black uppercase italic md:text-3xl">
              <Sparkles className="h-6 w-6 fill-[#A3E635] text-[#A3E635] md:h-8 md:w-8" />
              The Spotlight
            </h2>
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            {/* Added shrink-0 logic via the container to ensure cards don't collapse */}
            <div className="flex w-max space-x-6 px-4 pt-2 pb-10 md:space-x-8">
              {featuredChallenges.map((c) => (
                <div key={c.id} className="shrink-0">
                  <FeaturedChallengeCard c={c} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2 bg-zinc-100" />
          </ScrollArea>
        </section>
      )}

      {/* --- REFINED RESULTS HEADER --- */}
      <section className="space-y-8 px-4 md:space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            {isSearching ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase md:text-xs">
                  <Search className="h-3 w-3" /> Search Results For
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="max-w-[200px] truncate text-3xl font-black tracking-tighter text-black uppercase italic sm:max-w-none md:text-4xl">
                    &quot;{query.search}&quot;
                  </h2>
                  <Link
                    href="/challenges"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-black bg-zinc-50 transition-all hover:bg-black md:h-10 md:w-10"
                  >
                    <X className="h-4 w-4 stroke-[3px] text-black group-hover:text-[#A3E635] md:h-5 md:w-5" />
                  </Link>
                </div>
              </div>
            ) : (
              <h2 className="text-2xl font-black tracking-tighter text-black uppercase italic md:text-3xl">
                Explore All
              </h2>
            )}
          </div>

          <div className="block">
            <p className="text-left text-[10px] font-black tracking-[0.2em] text-zinc-300 uppercase md:text-right">
              {regularChallenges.length} Challenges available
            </p>
          </div>
        </div>

        {regularChallenges.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-24 md:py-40">
            <h3 className="text-3xl font-black text-zinc-200 uppercase italic md:text-4xl">
              Zero_Found
            </h3>
            <Link
              href="/challenges"
              className="text-xs font-black tracking-tighter uppercase underline underline-offset-8 hover:text-[#A3E635] md:text-sm"
            >
              Back to all challenges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularChallenges.map((c) => (
              <ChallengeCard
                key={c.id}
                challenge={c}
                redirectUrl="/challenges"
                currentUserId={session.user.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
