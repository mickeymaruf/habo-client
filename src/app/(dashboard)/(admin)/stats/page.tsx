import { cn } from "@/lib/utils";
import { statsService } from "@/services/stats.service";
import { ArrowUpRight, Users, Flame, Zap, DollarSign } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const { overview } = await statsService.getStats();

  return (
    <div className="mb-20 min-h-screen overflow-x-hidden bg-white font-mono text-black selection:bg-[#A3E635]">
      {/* --- RELEVANT HEADER --- */}
      <div className="flex flex-col justify-between gap-6 border-b-8 border-black p-6 md:flex-row md:items-end md:p-10">
        <div>
          <h1 className="text-4xl leading-none font-black tracking-tighter break-words uppercase italic sm:text-5xl md:text-7xl">
            Habo.Insights
          </h1>
          <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase md:text-xs md:tracking-[0.3em]">
            Real-time Habit Platform Analytics
          </p>
        </div>
        <div className="border-l-4 border-black pl-6">
          <p className="text-[10px] font-black text-black/40 uppercase">
            Gross Revenue
          </p>
          <p className="text-3xl font-black text-[#A3E635] italic md:text-4xl">
            ${overview.totalRevenue}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* --- CORE GROWTH METRICS --- */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-2 lg:border-r-4 lg:border-black">
          <MetricBox
            label="User_Base"
            value={overview.totalUsers}
            subtext={`${overview.activeUsers} Active Users`}
            icon={<Users className="h-6 w-6" />}
            className="border-b-4 border-black md:border-r-4"
          />

          <MetricBox
            label="Total_Challenges"
            value={overview.totalChallenges}
            subtext={`${overview.totalChallenges} All Tiers`}
            icon={<Zap className="h-6 w-6" />}
            className="border-b-4 border-black"
          />

          <MetricBox
            label="Premium_Challenges"
            value={overview.premiumChallenges}
            subtext={`${overview.premiumChallenges} Premium Tiers`}
            icon={<DollarSign className="h-6 w-6" />}
            className="border-b-4 border-black md:border-r-4"
          />

          <MetricBox
            label="Total_Participations"
            value={overview.totalParticipations}
            subtext={`${overview.completedParticipations} Finished Challenges`}
            icon={<Flame className="h-6 w-6" />}
            className="border-b-4 border-black bg-[#A3E635]/5"
          />

          <MetricBox
            label="Total_Comments"
            value={overview.totalComments + overview.totalVotes}
            subtext="Engagement"
            icon={<ArrowUpRight className="h-6 w-6" />}
            className="border-b-4 border-black md:border-r-4 md:border-b-0"
          />
        </div>

        {/* --- APP HEALTH SIDEBAR --- */}
        <div className="w-full p-6 md:p-10 lg:w-1/4">
          <h2 className="mb-8 inline-block border-b-4 border-[#A3E635] text-xl font-black uppercase italic">
            Platform_Health
          </h2>

          <div className="space-y-8">
            <HealthItem
              label="Blocked Accounts"
              value={overview.blockedUsers}
            />
            <HealthItem
              label="Payment Transactions"
              value={overview.totalPayments}
            />
            <HealthItem
              label="Premium Conversion"
              value={`${((overview.premiumChallenges / overview.totalChallenges) * 100).toFixed(0)}%`}
            />

            <div className="mt-12 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-2 text-[10px] font-black uppercase">
                Revenue Overview
              </p>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#A3E635]" />
                <span className="text-3xl font-black italic">
                  ${overview.totalRevenue}
                </span>
              </div>
              <Link href="/payments">
                <button className="mt-6 w-full bg-black py-3 text-[10px] font-black tracking-widest text-white uppercase transition-colors hover:bg-[#A3E635] hover:text-black">
                  View Financial Logs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* --- HELPER COMPONENTS --- */
}

function MetricBox({ label, value, subtext, icon, className }: any) {
  return (
    <div
      className={cn(
        "group p-8 transition-all hover:bg-black md:p-12",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <p className="text-xs font-black tracking-widest text-black/30 uppercase group-hover:text-[#A3E635]">
          {label}
        </p>
        <div className="ml-4 shrink-0 group-hover:text-white">{icon}</div>
      </div>
      <p className="text-6xl leading-none font-black tracking-tighter break-words italic group-hover:text-white sm:text-7xl md:text-8xl lg:text-9xl">
        {value}
      </p>
      <p className="mt-4 text-[10px] font-bold tracking-[0.2em] uppercase group-hover:text-white/60">
        {subtext}
      </p>
    </div>
  );
}

function HealthItem({ label, value }: any) {
  return (
    <div className="flex items-center justify-between gap-4 border-b-2 border-black/10 pb-2">
      <span className="text-[10px] font-black tracking-widest text-black/60 uppercase">
        {label}
      </span>
      <span className="shrink-0 text-xl font-black italic">{value}</span>
    </div>
  );
}
