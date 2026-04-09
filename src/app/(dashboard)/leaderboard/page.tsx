import {
  Star,
  Trophy,
  TrendingUp,
  Users,
  Flame,
  Target,
  ChevronUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { leaderboardService } from "@/services/leaderboard.service";

export default async function LeaderboardPage() {
  const [topChallenges, topUsers] = await Promise.all([
    leaderboardService.getTopChallenges(),
    leaderboardService.getTopUsers(),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 pt-10 pb-20 font-mono text-black dark:text-white">
      {/* Header Section */}
      <div className="space-y-4 text-center">
        <div className="inline-block skew-x-[-12deg] border-4 border-black bg-black px-6 py-2 text-white dark:border-zinc-800 dark:bg-[#A3E635] dark:text-black">
          <h2 className="text-xl font-black tracking-tighter uppercase italic">
            TOP 10
          </h2>
        </div>
        <h1 className="text-6xl leading-none font-black tracking-tighter uppercase italic sm:text-6xl md:text-8xl dark:text-white">
          LEADERBOARD<span className="text-[#A3E635]">_</span>
        </h1>
        <p className="mx-auto max-w-xl text-sm font-bold tracking-widest text-black/50 uppercase dark:text-zinc-500">
          Real-time intelligence on active missions and elite operative
          performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* --- MAIN ATTRACTION: CHALLENGE RANKINGS --- */}
        <div className="space-y-8 lg:col-span-8">
          <div className="flex items-center gap-4 border-b-8 border-black pb-4 dark:border-zinc-800">
            <TrendingUp className="h-8 w-8 stroke-[3px]" />
            <h3 className="text-3xl font-black tracking-tighter uppercase italic md:text-4xl">
              Challenges_Taking_Over
            </h3>
          </div>

          <div className="space-y-6">
            {topChallenges.map((challenge, index) => (
              /* --- HOVER CARD WRAPPER --- */
              <HoverCard key={challenge.id} openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <div className="group relative flex cursor-crosshair flex-col justify-between border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(163,230,53,1)] md:flex-row md:items-center dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] dark:hover:shadow-[12px_12px_0px_0px_rgba(163,230,53,0.3)]">
                    <div className="flex items-center gap-6">
                      <span className="text-5xl font-black text-black/10 italic dark:text-white/5">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="max-w-md text-2xl leading-tight font-black tracking-tighter uppercase dark:text-white">
                          {challenge.title}
                        </h4>

                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-1 text-[10px] tracking-widest uppercase dark:text-zinc-400">
                            <Users className="h-3 w-3" />{" "}
                            <strong className="text-sm font-black dark:text-white">
                              {challenge.participantCount}
                            </strong>{" "}
                            Participated
                          </span>
                          <span className="flex items-center gap-1 text-[10px] tracking-widest uppercase dark:text-zinc-400">
                            <ChevronUp className="h-3 w-3" />{" "}
                            <strong className="text-sm font-black dark:text-white">
                              {challenge.voteCount}
                            </strong>{" "}
                            Votes
                          </span>
                          <span className="bg-black px-2 text-[10px] tracking-widest text-[#A3E635] uppercase dark:bg-[#A3E635] dark:text-black">
                            SCORE:{" "}
                            <strong className="text-sm font-black">
                              {challenge.score}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* USER ICONS FROM API */}
                    <div className="mt-6 flex items-center -space-x-3 md:mt-0">
                      {challenge.topParticipants.map((p, i) => (
                        <Avatar
                          key={i}
                          className="h-9 w-9 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-zinc-900"
                        >
                          {p.image ? (
                            <AvatarImage
                              src={p.image}
                              alt={p.name}
                              className="object-cover"
                            />
                          ) : (
                            <AvatarFallback
                              className="text-[10px] font-black text-white uppercase"
                              style={{
                                backgroundColor: `hsl(${((p.name?.charCodeAt(0) || 0) * 37) % 360}, 60%, 45%)`,
                              }}
                            >
                              {p.name?.[0].toUpperCase() || "U"}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      ))}

                      {/* Count Indicator if more than shown */}
                      {challenge.participantCount >
                        challenge.topParticipants.length && (
                        <div className="z-10 flex h-9 w-9 items-center justify-center border-4 border-black bg-black text-[10px] font-black text-[#A3E635] dark:border-zinc-900">
                          +
                          {challenge.participantCount -
                            challenge.topParticipants.length}
                        </div>
                      )}
                    </div>
                  </div>
                </HoverCardTrigger>

                {/* --- BRUTALIST HOVER CONTENT --- */}
                <HoverCardContent
                  side="top"
                  align="start"
                  className="w-80 rounded-none border-4 border-black bg-white p-4 font-mono shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[8px_8px_0px_0px_rgba(163,230,53,0.3)]"
                >
                  <div className="space-y-4">
                    <div className="border-b-2 border-black pb-2 dark:border-zinc-800">
                      <h5 className="flex items-center gap-2 text-[10px] font-black tracking-widest text-black/40 uppercase dark:text-zinc-500">
                        <Target className="h-3 w-3" /> Top_Contributors
                      </h5>
                    </div>
                    <div className="space-y-3">
                      {challenge.topParticipants.slice(0, 3).map((p, i) => (
                        <div
                          key={i}
                          className="group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-black text-[10px] font-black text-white dark:border-zinc-700">
                              {p.name?.[0].toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs leading-none font-black tracking-tighter uppercase dark:text-white">
                                {p.name}
                              </span>
                              <span className="text-[8px] font-bold text-black/40 uppercase dark:text-zinc-500">
                                {p.completionPercentage}% Done
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 border-2 border-black bg-[#A3E635] px-2 text-[10px] font-black italic dark:text-black">
                            <Flame className="h-3 w-3 fill-black" /> {p.streak}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t-2 border-black pt-2 dark:border-zinc-800">
                      <p className="text-[9px] leading-tight font-bold text-black/50 uppercase dark:text-zinc-500">
                        Total Participants: {challenge.participantCount} Active
                        • {challenge.commentCount} Engagements
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* --- SIDEBAR: ELITE USERS --- */}
        <div className="space-y-8 lg:col-span-4">
          <div className="flex items-center gap-4 border-b-8 border-black pb-4 dark:border-zinc-800">
            <Trophy className="h-8 w-8 stroke-[3px]" />
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">
              Top_Contributors
            </h3>
          </div>

          <div className="space-y-6 rounded-[30px] border-4 border-black bg-zinc-50 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-zinc-800 dark:bg-zinc-900/30 dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
            {topUsers.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between border-b-2 border-black/10 pb-4 last:border-0 last:pb-0 dark:border-zinc-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden border-4 border-black bg-white font-black uppercase dark:border-zinc-800 dark:bg-zinc-950">
                      {user.image ? (
                        <img src={user.image} alt={user.name} />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    {index === 0 && (
                      <Star className="absolute -top-2 -right-2 h-5 w-5 fill-yellow-400 stroke-black stroke-2" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm leading-none font-black uppercase dark:text-white">
                      {user.name}
                    </p>
                    <p className="mt-1 text-[10px] tracking-widest text-black/40 uppercase dark:text-zinc-500">
                      Total Score:{" "}
                      <strong className="font-black text-black dark:text-[#A3E635]">
                        {user.totalScore}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 font-black text-orange-500 italic">
                    <Flame className="h-4 w-4 fill-orange-500" />{" "}
                    <span className="text-lg">{user.activeCheckIns}</span>
                  </div>
                  <p className="text-[9px] font-bold tracking-tighter text-black/30 uppercase dark:text-zinc-600">
                    Active Streak
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
