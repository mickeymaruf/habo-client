import { Button } from "@/components/ui/button";
import { Plus, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero2() {
  return (
    <section className="relative overflow-hidden border-8 border-black bg-white p-8 shadow-[16px_16px_0px_0px_rgba(163,230,53,1)] md:p-16">
      <div className="relative z-10 flex flex-col justify-between gap-12 lg:flex-row lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex skew-x-[-12deg] items-center gap-2 border-4 border-black bg-black px-4 py-1 text-xs font-black text-[#A3E635] uppercase italic">
            <Zap className="h-3 w-3 fill-[#A3E635]" /> Protocol_Active
          </div>
          <h1 className="text-6xl leading-[0.85] font-black tracking-tighter uppercase italic md:text-8xl">
            LIMITLESS <br />
            <span className="text-[#A3E635] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              CHALLENGES
            </span>
          </h1>
          <p className="max-w-md text-xl leading-tight font-bold tracking-tight text-black/60 uppercase">
            Don&apos;t just watch. Participate. Level up your consistency with
            community-driven roadmaps.
          </p>
        </div>

        <Button
          asChild
          className="h-24 w-full border-4 border-black bg-black px-12 text-2xl font-black text-[#A3E635] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] active:translate-y-1 lg:w-auto"
        >
          <Link href="/challenges/new" className="flex items-center gap-4">
            <Plus className="h-8 w-8 stroke-[4px]" />
            CREATE_NEW
          </Link>
        </Button>
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />
    </section>
  );
}
