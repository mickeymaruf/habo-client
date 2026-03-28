import { Challenge } from "@/types/challenge.type";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedChallengeCard({ c }: { c: Challenge }) {
  return (
    <Link
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
  );
}
