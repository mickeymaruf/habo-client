import { userChallengeService } from "@/services/user-challenge.service";
import {
  Rocket,
  History,
  Plus,
  Settings2,
  Users2,
  ExternalLink,
  Ban,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function HistoryPage() {
  const { data } = await userChallengeService.getMyChallenges();
  const { created, history } = data;

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 md:px-0">
      {/* --- SECTION 1: CREATED MISSIONS --- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b-8 border-black pb-6">
          <div className="flex items-center gap-4">
            <Rocket className="h-10 w-10 stroke-[3px]" />
            <h2 className="text-4xl font-black tracking-tighter uppercase italic md:text-5xl">
              Published <span className="text-[#A3E635]">Challenges</span>
            </h2>
          </div>
          <Link href="/challenges/new">
            <button className="group flex items-center gap-2 border-4 border-black bg-[#A3E635] px-6 py-3 font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
              <Plus className="h-5 w-5 stroke-[4px]" />
              <span className="hidden italic md:inline">NEW MISSION</span>
            </button>
          </Link>
        </div>

        <div className="overflow-hidden border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:rounded-[40px]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-4 border-black bg-black text-xs font-black tracking-widest text-white uppercase italic">
                <th className="p-6">Mission Log</th>
                <th className="hidden p-6 text-center md:table-cell">Status</th>
                <th className="p-6 text-right">Control</th>
              </tr>
            </thead>
            <tbody>
              {created.length > 0 ? (
                created.map((item: any) => (
                  <tr
                    key={item.id}
                    className="border-b-4 border-black transition-colors last:border-0 hover:bg-zinc-50"
                  >
                    <td className="p-6">
                      <Link
                        href={`/challenges/${item.id}`}
                        className="group flex w-fit flex-col gap-1"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xl font-black tracking-tight uppercase italic decoration-black decoration-2 group-hover:underline">
                            {item.title}
                          </span>
                          <ExternalLink className="h-4 w-4 stroke-[3px]" />
                        </div>
                      </Link>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="bg-black px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-black/40 uppercase">
                          <Users2 className="h-3 w-3" />
                          {item._count.participations} Agents Active
                        </div>
                      </div>

                      {/* Mobile Status Logic */}
                      <div className="mt-3 md:hidden">
                        {item.isBanned ? (
                          <div className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-black px-3 py-1 text-[8px] font-black text-white uppercase">
                            <Ban className="h-3 w-3 text-red-500" />
                            Banned
                          </div>
                        ) : item.isDeleted ? (
                          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-red-400 px-3 py-1 text-[8px] font-black text-white uppercase">
                            Deleted
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-1 text-[8px] font-black uppercase">
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A3E635]" />
                            Live
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Desktop Status Logic */}
                    <td className="hidden p-6 text-center md:table-cell">
                      {item.isBanned ? (
                        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-1.5 text-[10px] font-black text-white uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <Ban className="h-3 w-3 stroke-[3px] text-red-500" />
                          Banned
                        </div>
                      ) : item.isDeleted ? (
                        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-red-400 px-4 py-1.5 text-[10px] font-black text-white uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          Deleted
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 text-[10px] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-[#A3E635]" />
                          Live on Habo
                        </div>
                      )}
                    </td>

                    <td className="p-6 text-right">
                      {!item.isBanned && !item.isDeleted ? (
                        <Link href={`/challenges/${item.id}/edit`}>
                          <button className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-5 py-2.5 text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95">
                            <Settings2 className="h-4 w-4" />
                            Edit
                          </button>
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="p-24 text-center text-2xl font-black tracking-tighter uppercase italic opacity-20"
                  >
                    No active mission protocols found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- SECTION 2: ARCHIVE --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-b-8 border-black pb-6">
          <History className="h-10 w-10 stroke-[3px]" />
          <h2 className="text-4xl font-black tracking-tighter uppercase italic md:text-5xl">
            Mission <span className="text-zinc-400">Archive</span>
          </h2>
        </div>

        <div className="overflow-hidden border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:rounded-[40px]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-4 border-black bg-zinc-900 text-xs font-black tracking-widest text-white uppercase italic">
                <th className="p-6">Operation History</th>
                <th className="p-6 text-right">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((record: any) => (
                  <tr
                    key={record.id}
                    className="border-b-4 border-black transition-colors last:border-0 hover:bg-zinc-50"
                  >
                    <td className="p-6">
                      <Link
                        href={`/challenges/${record.challenge.id}`}
                        className="group flex w-fit flex-col gap-1"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xl font-black tracking-tight uppercase italic decoration-black decoration-2 group-hover:underline">
                            {record.challenge.title}
                          </span>
                          <ExternalLink className="h-4 w-4 stroke-[3px]" />
                        </div>
                      </Link>
                      <div className="mt-1 text-[10px] font-bold text-black/40 uppercase">
                        Logged: {new Date(record.joinedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border-2 border-black px-4 py-1.5 text-[10px] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
                          record.completed
                            ? "bg-[#A3E635]"
                            : "bg-red-400 text-white",
                        )}
                      >
                        {record.completed ? "Victory" : "Aborted"}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="p-24 text-center text-2xl font-black tracking-tighter uppercase italic opacity-20"
                  >
                    History log is clear.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
