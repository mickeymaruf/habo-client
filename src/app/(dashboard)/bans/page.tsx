import {
  ShieldAlert,
  Terminal,
  ArrowRight,
  Ban,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { adminService } from "@/services/admin.service";
import { banChallenge, unbanChallenge } from "@/actions/admin";

export default async function AdminChallengesPage() {
  const { data: challenges } = await adminService.getBannedChallenges();

  async function handleToggle(id: string, isCurrentlyBanned: boolean) {
    "use server";
    if (isCurrentlyBanned) {
      await unbanChallenge(id);
    } else {
      await banChallenge(id, "Administrative suspension");
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 font-mono md:px-0">
      {/* --- HEADER SECTION --- */}
      <div className="flex items-center justify-between border-b-8 border-black pb-6">
        <div className="flex items-center gap-4">
          <ShieldAlert className="h-10 w-10 stroke-[3px] text-red-500" />
          <h2 className="text-4xl font-black tracking-tighter uppercase italic md:text-5xl">
            Global <span className="text-[#A3E635]">Overrides</span>
          </h2>
        </div>
        <div className="hidden items-center gap-2 rounded-xl border-4 border-black bg-black px-4 py-2 text-[#A3E635] md:flex">
          <Terminal className="h-4 w-4 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase">
            Admin.Authorized
          </span>
        </div>
      </div>

      {/* --- OVERRIDE LOG TABLE --- */}
      <div className="overflow-hidden border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:rounded-[40px]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-4 border-black bg-black text-xs font-black tracking-widest text-white uppercase italic">
              <th className="p-6">Mission Log</th>
              <th className="hidden p-6 text-center md:table-cell">Status</th>
              <th className="p-6 text-right">Access & Control</th>
            </tr>
          </thead>
          <tbody>
            {challenges && challenges.length > 0 ? (
              challenges.map((challenge: any) => {
                // Using your boolean logic instead of .status string
                const isBanned = challenge.isBanned;

                return (
                  <tr
                    key={challenge.id}
                    className="border-b-4 border-black transition-colors last:border-0 hover:bg-zinc-50"
                  >
                    <td className="p-6">
                      <div className="text-xl font-black tracking-tight uppercase italic">
                        {challenge.title}
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="bg-black px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                          {challenge.category}
                        </span>
                        <span className="text-[10px] font-bold text-black/40 uppercase">
                          ID: {challenge.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>

                    <td className="hidden p-6 text-center md:table-cell">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border-2 border-black px-4 py-1.5 text-[10px] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
                          !isBanned ? "bg-[#A3E635]" : "bg-red-500 text-white",
                        )}
                      >
                        {isBanned ? (
                          <>
                            <Ban className="h-3 w-3" /> BANNED
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-3 w-3" /> ACTIVE
                          </>
                        )}
                      </div>
                    </td>

                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/challenges/${challenge.id}`}>
                          <button className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2 text-[10px] font-black uppercase transition-all hover:bg-zinc-100 active:scale-95">
                            Visit <ArrowRight className="h-3 w-3" />
                          </button>
                        </Link>

                        {/* Direct Server Action Connection */}
                        <form
                          action={handleToggle.bind(
                            null,
                            challenge.id,
                            isBanned,
                          )}
                        >
                          <button
                            type="submit"
                            className={cn(
                              "inline-flex items-center gap-2 rounded-xl border-2 border-black px-5 py-2 text-[10px] font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95",
                              isBanned
                                ? "bg-[#A3E635] text-black"
                                : "bg-black text-white",
                            )}
                          >
                            {isBanned ? (
                              <>
                                <ShieldCheck className="h-4 w-4" /> UNBAN
                              </>
                            ) : (
                              <>
                                <ShieldAlert className="h-4 w-4" /> SUSPEND
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-24 text-center text-2xl font-black tracking-tighter uppercase italic opacity-20"
                >
                  No Banned Protocols found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
