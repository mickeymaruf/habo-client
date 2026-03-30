import { Challenge } from "@/types/challenge.type";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export default function FeaturedChallengeCard({ c }: { c: Challenge }) {
  return (
    <Link
      href={`/challenges/${c.id}`}
      className="group relative flex min-h-[400px] w-[320px] shrink-0 flex-col overflow-hidden rounded-[35px] bg-zinc-900 p-6 transition-all hover:-translate-y-2 sm:w-[320px] md:min-h-[420px] md:w-[380px] md:rounded-[45px] md:p-8"
    >
      {/* Background Accents */}
      <div className="absolute top-0 right-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-[#C3B5FD]/20 blur-3xl transition-colors group-hover:bg-[#A3E635]/20" />

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-4">
          {/* TOP TAGS: Adopting the layout but with Zinc styling */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {c.isPremium && (
              <div className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-zinc-300">
                <Lock className="h-3 w-3 stroke-[3px]" />
                <span className="text-[10px] font-black tracking-tighter uppercase italic">
                  PREMIUM
                </span>
              </div>
            )}

            <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-4 py-1 text-[10px] font-black tracking-tighter text-zinc-400 uppercase">
              {c.category}
            </span>
          </div>

          <h3 className="line-clamp-4 text-3xl leading-none font-medium whitespace-normal text-white group-hover:text-[#A3E635]">
            {c.title}
          </h3>
          <p className="line-clamp-2 text-sm font-bold text-zinc-500">
            {c.description}
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex -space-x-3">
            {c.participations.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-[3px] border-zinc-900 bg-zinc-800 md:h-10 md:w-10 md:border-4"
              />
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-zinc-900 bg-[#A3E635] text-[9px] font-black text-black md:h-10 md:w-10 md:border-4 md:text-[10px]">
              {c._count?.participations}+
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs font-black text-white uppercase md:text-sm">
              {c.durationDays} DAYS
            </div>
            <div className="rounded-full bg-white p-3 text-black transition-transform group-hover:rotate-45">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
