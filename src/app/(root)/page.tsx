import React from "react";
import {
  ArrowRight,
  Flame,
  Zap,
  Target,
  Award,
  ShieldCheck,
  Plus,
  Quote,
  Users,
  Lock,
  Globe,
  Monitor,
  Trophy,
  Activity,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Hero from "@/components/home/hero";
import { FaqAccordion } from "@/components/home/faq-accordion";

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

      {/* --- TRENDING CHALLENGES --- */}
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

      {/* --- PROOF OF PERFORMANCE (TESTIMONIALS) --- */}
      <section className="border-b-4 border-black bg-[#A3E635] py-16 md:border-b-8 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader title="User_Transmission" icon={<Quote />} />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "REX_01",
                text: "Habo is the only app that actually made me wake up at 5am. The public shame of a broken streak is a powerful motivator.",
              },
              {
                name: "DELTA_V",
                text: "Forget soft habit trackers. This is a battleground for your discipline. 100 days of code completed thanks to Mission Control.",
              },
              {
                name: "VOID_WALKER",
                text: "The UI is aggressive and the community is relentless. If you want to stop being average, this is the protocol.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <Quote className="mb-4 h-8 w-8 text-black opacity-20" />
                <p className="mb-6 text-lg font-bold tracking-tight text-black uppercase italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-2 border-t-2 border-black/10 pt-4">
                  <div className="h-8 w-8 rounded-full bg-black" />
                  <span className="font-black tracking-tighter uppercase">
                    {t.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SQUAD DYNAMICS --- */}
      <section className="border-b-4 border-black bg-white py-16 md:border-b-8 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader title="Squad_Units" icon={<Users />} />

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Narrative Side */}
            <div className="space-y-6">
              <h2 className="text-4xl leading-none font-black tracking-tighter uppercase italic md:text-6xl">
                Don't Go <span className="text-zinc-400">Solo.</span> <br />
                Join A <span className="text-[#A3E635]">Unit.</span>
              </h2>
              <p className="text-lg font-bold tracking-tight text-black/60 uppercase">
                The protocol is 300% more effective when executed in squads.
                Join high-performance clans or build your own. Collective
                accountability means if you fail, the squad's rank drops.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-4 border-l-4 border-[#A3E635] pl-4">
                  <Trophy className="h-6 w-6" />
                  <span className="font-black uppercase italic">
                    Squad Leaderboards
                  </span>
                </div>
                <div className="flex items-center gap-4 border-l-4 border-[#A3E635] pl-4">
                  <Activity className="h-6 w-6" />
                  <span className="font-black uppercase italic">
                    Shared Momentum Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Squad Card */}
            <div className="relative border-4 border-black bg-zinc-100 p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-4">
                <span className="font-black uppercase italic">
                  Active_Squad: ALPHA_V3
                </span>
                <span className="bg-black px-2 text-xs font-bold text-[#A3E635]">
                  TOP_RANK
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    user: "OPERATIVE_K",
                    status: "COMPLETE",
                    color: "bg-[#A3E635]",
                  },
                  {
                    user: "VOID_WALKER",
                    status: "COMPLETE",
                    color: "bg-[#A3E635]",
                  },
                  { user: "USER_099", status: "PENDING", color: "bg-zinc-300" },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-2 border-black bg-white p-3"
                  >
                    <span className="text-sm font-black">{member.user}</span>
                    <div
                      className={`border-2 border-black px-2 py-1 text-[10px] font-black ${member.color}`}
                    >
                      {member.status}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-black p-4 text-center">
                <p className="text-[10px] font-bold text-[#A3E635] uppercase">
                  Squad_Compliance_Rate
                </p>
                <p className="text-4xl font-black text-white italic">92.4%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPARISON PROTOCOL --- */}
      <section className="border-b-4 border-black bg-[#f0f0f0] py-16 md:border-b-8 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader title="System_Comparison" icon={<Terminal />} />

          <div className="mt-16 overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-4 border-black bg-black text-white">
                  <th className="p-4 font-black uppercase italic">Feature</th>
                  <th className="p-4 font-black text-zinc-500 uppercase italic">
                    Other Apps
                  </th>
                  <th className="p-4 font-black text-[#A3E635] uppercase italic">
                    HABO Protocol
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold uppercase md:text-sm">
                {[
                  {
                    f: "Accountability",
                    old: "Self-Reported",
                    habo: "Public Proof-of-Work",
                  },
                  {
                    f: "Streak Breaks",
                    old: "Forgiveness/Pause",
                    habo: "Public Failure Log",
                  },
                  {
                    f: "Community",
                    old: "Passive Forums",
                    habo: "Active Mission Squads",
                  },
                  {
                    f: "UI Style",
                    old: "Soft / Pastel",
                    habo: "Aggressive / Performance",
                  },
                  {
                    f: "Dopamine",
                    old: "Cute Animations",
                    habo: "Rank Advancement",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b-2 border-black transition-colors hover:bg-[#A3E635]/5"
                  >
                    <td className="border-r-2 border-black bg-zinc-50 p-4">
                      {row.f}
                    </td>
                    <td className="border-r-2 border-black p-4 text-zinc-400">
                      {row.old}
                    </td>
                    <td className="p-4 font-black">{row.habo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-center text-xs font-black text-black/40 uppercase italic">
            * Comparison based on standard market leading "soft-habit"
            applications.
          </p>
        </div>
      </section>

      {/* --- THE PROTOCOL (HOW IT WORKS) --- */}
      <section className="border-b-4 border-black bg-white py-16 text-black md:border-b-8 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader title="The_Protocol" icon={<Monitor />} />
          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Initialize",
                desc: "Select or define your mission parameters.",
              },
              {
                step: "02",
                title: "Sync",
                desc: "Connect with a squad or go solo in the public arena.",
              },
              {
                step: "03",
                title: "Execute",
                desc: "Log your daily progress before the 24h cycle resets.",
              },
              {
                step: "04",
                title: "Verify",
                desc: "Proof of work is validated by the Habo network.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="group relative border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-black hover:text-white"
              >
                <span className="absolute -top-4 left-4 border-2 border-black bg-[#A3E635] px-2 text-2xl font-black text-black italic">
                  {s.step}
                </span>
                <h4 className="mt-4 mb-2 text-xl font-black uppercase italic">
                  {s.title}
                </h4>
                <p className="text-xs font-bold text-black/60 uppercase group-hover:text-white/70">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BRAND ORIGIN SECTION --- */}
      <section className="border-b-4 border-black bg-zinc-50 py-12 md:border-b-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
            {/* Label/Text */}
            <div className="max-w-xs text-center lg:text-left">
              <h3 className="text-sm font-black tracking-tighter text-black/40 uppercase">
                Detected_Origins:
              </h3>
              <p className="text-xs leading-tight font-bold text-black uppercase">
                High-performers from these nodes have integrated the protocol.
              </p>
            </div>

            {/* Logos Container */}
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {[
                { name: "META_CORP", slug: "meta" },
                { name: "GOOGLE_SYS", slug: "google" },
                { name: "STRIPE_PAY", slug: "stripe" },
                { name: "APPLE", slug: "apple" },
                { name: "TESLA_MOTORS", slug: "tesla" },
                { name: "VERCEL_NET", slug: "vercel" },
              ].map((brand) => (
                <div
                  key={brand.slug}
                  className="group relative flex flex-col items-center justify-center"
                >
                  {/* The Logo */}
                  <img
                    src={`https://cdn.simpleicons.org/${brand.slug}/000000`}
                    alt={brand.name}
                    className="h-7 w-auto opacity-30 grayscale filter transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 md:h-9"
                  />

                  {/* Hover Title (The "Tooltip") */}
                  <span className="pointer-events-none absolute -bottom-8 scale-0 border-2 border-black bg-[#A3E635] px-2 py-0.5 text-[10px] font-black text-black uppercase italic transition-all group-hover:translate-y-1 group-hover:scale-100 md:text-xs">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- HABIT_PRICING --- */}
      <section className="border-b-4 border-black bg-zinc-50 py-16 md:border-b-8 md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <SectionHeader title="Access_Levels" icon={<ShieldCheck />} />
          <div className="mt-16 flex flex-col justify-center gap-8 md:flex-row">
            <div className="w-full border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:w-80">
              <h5 className="text-xl font-black uppercase italic">
                Basic_Operative
              </h5>
              <p className="my-4 text-4xl font-black">$0</p>
              <ul className="mb-8 space-y-2 text-left text-xs font-bold text-black/60 uppercase">
                <li className="flex items-center gap-2">
                  <Plus size={12} className="text-[#A3E635]" /> Public Missions
                </li>
                <li className="flex items-center gap-2">
                  <Plus size={12} className="text-[#A3E635]" /> Basic Analytics
                </li>
                <li className="flex items-center gap-2">
                  <Plus size={12} className="text-[#A3E635]" /> Global
                  Leaderboard
                </li>
              </ul>
              <button className="w-full border-2 border-black py-2 font-black uppercase transition-colors hover:bg-black hover:text-white">
                Deploy
              </button>
            </div>
            <div className="w-full border-4 border-black bg-black p-8 text-white shadow-[8px_8px_0px_0px_#A3E635] md:w-80">
              <h5 className="text-xl font-black text-[#A3E635] uppercase italic">
                Elite_Commander
              </h5>
              <p className="my-4 text-4xl font-black">
                $12<span className="text-sm">/mo</span>
              </p>
              <ul className="mb-8 space-y-2 text-left text-xs font-bold text-white/60 uppercase">
                <li className="flex items-center gap-2">
                  <Plus size={12} className="text-[#A3E635]" /> Private Squads
                </li>
                <li className="flex items-center gap-2">
                  <Plus size={12} className="text-[#A3E635]" /> Advanced
                  Dynamics
                </li>
                <li className="flex items-center gap-2">
                  <Plus size={12} className="text-[#A3E635]" /> Custom Mission
                  Logic
                </li>
              </ul>
              <button className="w-full bg-[#A3E635] py-2 font-black text-black uppercase transition-transform hover:scale-105">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION WITH ACCORDION --- */}
      <section
        id="faq"
        className="border-b-4 border-black bg-white py-16 md:border-b-8 md:py-24"
      >
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader title="F_A_Q" icon={<ShieldCheck />} />
          <FaqAccordion />
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
