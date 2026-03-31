import { ArrowLeft, Terminal, Settings2 } from "lucide-react";
import Link from "next/link";
import { authService } from "@/services/auth.service";
import { challengeService } from "@/services/challenge.service";
import { notFound } from "next/navigation";
import EditChallengeForm from "./_components/edit-challenge-form";

export default async function EditChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await authService.getSession();

  // Fetch existing challenge data
  const { data: challenge } = await challengeService.getSingleChallenge(id);

  if (!challenge) return notFound();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white p-4 font-mono selection:bg-[#A3E635] selection:text-black md:p-12">
      {/* Background Decor - Large Text */}
      <div className="pointer-events-none absolute top-0 right-[5%] z-0 select-none">
        <p className="text-[6rem] font-black tracking-tighter text-black/5 uppercase italic md:text-[12rem]">
          CONFIGURE
        </p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        {/* Tactical Back Button */}
        <Link href="/history" className="group inline-block">
          <button className="mb-6 flex cursor-pointer items-center gap-2 border-4 border-black bg-white px-4 py-2 text-xs font-black tracking-widest uppercase transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none md:mb-10">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Return to Logs
          </button>
        </Link>

        {/* Main Form Container */}
        <div className="border-[4px] border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:border-[6px] md:p-12 md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          {/* Header Section */}
          <div className="mb-8 border-b-4 border-black pb-8 md:mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-black p-2">
                <Settings2 className="h-5 w-5 text-[#A3E635] md:h-6 md:w-6" />
              </div>
              <span className="text-[8px] font-black tracking-[0.2em] text-black/40 uppercase md:text-[10px] md:tracking-[0.3em]">
                Protocol.Maintenance.v3
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tighter text-black uppercase italic md:text-5xl">
              Edit <span className="text-[#A3E635]">Protocol</span>
            </h1>
            <p className="mt-4 max-w-md text-xs leading-relaxed font-bold tracking-tight text-black/60 uppercase md:text-sm">
              Adjust mission parameters and update recruitment requirements.
              Changes will sync across all active agents.
            </p>
          </div>

          {/* Form Section */}
          <div className="relative">
            {/* Subtle side accent */}
            <div className="absolute top-0 -left-12 hidden h-full w-1 bg-black/5 lg:block"></div>

            {/* Pass both challenge data and user role */}
            <EditChallengeForm
              challenge={challenge}
              role={session?.user?.role || "USER"}
            />
          </div>

          {/* Footer Note */}
          <div className="mt-8 flex items-center gap-4 bg-black p-4 text-[#A3E635] md:mt-12">
            <div className="h-2 w-2 animate-pulse bg-[#A3E635]"></div>
            <p className="text-[9px] font-black tracking-widest uppercase md:text-[10px]">
              CAUTION: Altering duration or price will affect future
              participants immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
