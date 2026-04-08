import React from "react";
import {
  ArrowRight,
  Flame,
  Zap,
  Target,
  Award,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Hero from "@/components/home/hero";

export default function LandingPage() {
  return (
    <>
      {/* --- HERO SECTION --- */}
      <Hero />

      <div className="group flex overflow-hidden border-y-4 border-black bg-black py-6 whitespace-nowrap md:border-y-8 md:py-8">
        <div className="animate-marquee-smooth flex items-center gap-12 pr-12 text-2xl font-black tracking-tighter text-[#A3E635] uppercase italic group-hover:[animation-play-state:paused] md:gap-20 md:pr-20 md:text-4xl">
          {/* First Set */}
          <span>1.2M Habits Tracked</span>
          <Zap
            fill="#A3E635"
            size={32}
            className="md:h-10 md:w-10"
            strokeWidth={0}
          />
          <span>500+ Active Challenges</span>
          <Zap
            fill="#A3E635"
            size={32}
            className="md:h-10 md:w-10"
            strokeWidth={0}
          />
          <span>12K Task Completions</span>
          <Zap
            fill="#A3E635"
            size={32}
            className="md:h-10 md:w-10"
            strokeWidth={0}
          />

          {/* Exact Duplicate Set for Seamless Looping */}
          <span>1.2M Habits Tracked</span>
          <Zap
            fill="#A3E635"
            size={32}
            className="md:h-10 md:w-10"
            strokeWidth={0}
          />
          <span>500+ Active Challenges</span>
          <Zap
            fill="#A3E635"
            size={32}
            className="md:h-10 md:w-10"
            strokeWidth={0}
          />
          <span>12K Task Completions</span>
          <Zap
            fill="#A3E635"
            size={32}
            className="md:h-10 md:w-10"
            strokeWidth={0}
          />
        </div>
      </div>

      {/* --- SYSTEM MODULES (FEATURES) --- */}
      <section
        id="features"
        className="border-b-4 border-black bg-zinc-50 py-16 md:border-b-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader title="System_Modules" icon={<Zap />} />

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Target className="h-8 w-8" />}
              title="Mission Control"
              desc="Deploy your own habit challenges or join curated public missions with strict tracking."
            />
            <FeatureCard
              icon={<Flame className="h-8 w-8" />}
              title="Streak Dynamics"
              desc="Track your daily consistency. Breaks are visible — pressure drives performance."
            />
            <FeatureCard
              icon={<Award className="h-8 w-8" />}
              title="Community Pressure"
              desc="Compete and collaborate with others. Progress is public — accountability fuels growth."
            />
          </div>
        </div>
      </section>

      {/* --- Trending Challenges --- */}
      <section
        id="deployment"
        className="border-b-4 border-black bg-white py-16 md:border-b-8 md:py-24"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-16">
          <div className="w-full flex-1 space-y-6">
            <SectionHeader
              title="Trending_Challenges"
              icon={<Award />}
              align="start"
            />
            <p className="text-2xl leading-none font-black tracking-tighter uppercase italic sm:text-3xl">
              Challenges People Are{" "}
              <span className="text-zinc-300">Actually Finishing.</span>
            </p>
            <p className="text-lg leading-tight font-bold tracking-tight text-black/60 uppercase">
              This is where consistency happens. View the top missions right now
              and see real-time engagement logs.
            </p>

            <div className="space-y-4 pt-8">
              {["30_DAY_DEEP_WORK", "WAKE_UP_5AM", "NO_SUGAR_14_DAYS"].map(
                (m) => (
                  <div
                    key={m}
                    className="group flex items-center justify-between border-b-4 border-black p-2 pb-4 transition-colors hover:bg-[#A3E635]/10"
                  >
                    <span className="text-xl font-black tracking-tighter uppercase italic md:text-2xl">
                      {m}
                    </span>
                    <span className="bg-black px-2 font-bold text-[#A3E635] transition-transform group-hover:skew-x-12">
                      TOP
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Visual Representation (Using your existing card style) */}
          <div className="w-full border-4 border-black bg-black p-6 text-white shadow-[12px_12px_0px_0px_#A3E635] md:border-[6px] md:p-8 md:shadow-[16px_16px_0px_0px_#A3E635] lg:w-[450px]">
            <div className="mb-6 flex items-start justify-between">
              <Zap className="h-8 w-8 text-[#A3E635] md:h-10 md:w-10" />
              <span className="bg-[#A3E635] px-2 text-[10px] font-black tracking-widest text-black uppercase">
                Daily_Challenge
              </span>
            </div>
            <h4 className="mb-4 text-3xl font-black tracking-tighter uppercase italic md:text-4xl">
              LEARN_10_VOCABS
            </h4>
            <p className="mb-8 text-sm leading-relaxed font-bold text-white/60 uppercase">
              Commit to learning 10 new words every day. Track your progress and
              expand your vocabulary consistently.
            </p>
            <div className="flex justify-between border-t-2 border-white/20 pt-6">
              <StatItem label="Participants" value="1,450" />
              <StatItem label="Completed" value="980" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section
        id="cta"
        className="relative overflow-hidden bg-black py-20 text-white md:py-32"
      >
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ShieldCheck className="mx-auto mb-8 h-16 w-16 stroke-[1px] text-[#A3E635] md:mb-12 md:h-20 md:w-20" />
          <h2 className="mb-8 text-4xl leading-none font-black tracking-tighter uppercase italic sm:text-6xl md:text-8xl">
            <span className="text-[#A3E635]">HABO</span> IS NOT FOR EVERYONE.
          </h2>
          <p className="mb-12 text-lg leading-relaxed font-bold tracking-tight text-white/70 uppercase md:mb-16 md:text-xl">
            HABO is not another self-improvement app. It is{" "}
            <strong className="text-[#A3E635]">accountability</strong>. Join
            challenges, build streaks, and grow together. Miss a day, fall
            behind, and everyone sees it. Discipline is no longer optional.
          </p>
          <button className="w-full border-4 border-[#A3E635] bg-[#A3E635] px-8 py-4 text-lg font-black whitespace-nowrap text-black uppercase italic shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all hover:translate-y-1 hover:border-white hover:bg-white hover:shadow-none sm:w-auto md:px-12 md:py-5 md:text-2xl md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            Start_Your_Challenge{" "}
            <ArrowRight className="ml-2 inline-block h-6 w-6 stroke-[3px]" />
          </button>
        </div>

        {/* Visual Interference Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border-t border-white/5"
              style={{ top: `${i * 5}%`, left: 0, right: 0, height: "1px" }}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  title,
  icon,
  align = "center",
}: {
  title: string;
  icon: React.ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
      )}
    >
      <div className="skew-x-[-12deg] border-4 border-black bg-white p-3 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {icon}
      </div>
      <h3 className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase md:text-sm md:tracking-[0.4em]">
        {title}
      </h3>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-2 hover:bg-black hover:text-white hover:shadow-[12px_12px_0px_0px_#A3E635] md:p-8">
      <div className="mb-6 flex h-14 w-14 items-center justify-center border-2 border-black text-black transition-colors group-hover:border-[#A3E635] group-hover:text-[#A3E635] md:h-16 md:w-16">
        {icon}
      </div>
      <h4 className="mb-4 text-2xl font-black tracking-tighter uppercase italic md:text-3xl">
        {title}
      </h4>
      <p className="text-sm leading-relaxed font-bold text-black/60 uppercase transition-colors group-hover:text-white/70">
        {desc}
      </p>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-left">
      <p className="text-[9px] font-black tracking-widest text-[#A3E635] uppercase">
        {label}
      </p>
      <p className="text-xl font-black tracking-tighter text-white italic md:text-2xl">
        {value}
      </p>
    </div>
  );
}
