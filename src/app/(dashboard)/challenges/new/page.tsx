import { ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";
import CreateChallengeForm from "./_components/create-challenge-form";
import { authService } from "@/services/auth.service";

export default async function CreateChallengePage() {
  const session = await authService.getSession();

  return (
    <div className="relative min-h-screen w-full bg-white p-6 font-mono selection:bg-[#A3E635] selection:text-black md:p-12">
      {/* Background Decor - Large Text */}
      <div className="pointer-events-none absolute top-0 right-[5%] z-0 select-none">
        <p className="text-[12rem] font-black tracking-tighter text-black/5 uppercase italic">
          OBJECTIVE
        </p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        {/* Tactical Back Button */}
        <Link href="/challenges" className="group inline-block">
          <button className="mb-10 flex cursor-pointer items-center gap-2 border-4 border-black bg-white px-4 py-2 text-xs font-black tracking-widest uppercase transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Return to Base
          </button>
        </Link>

        {/* Main Form Container */}
        <div className="border-[6px] border-black bg-white p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] md:p-12">
          {/* Header Section */}
          <div className="mb-12 border-b-4 border-black pb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-black p-2">
                <Terminal className="h-6 w-6 text-[#A3E635]" />
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] text-black/40 uppercase">
                Protocol.Initiation.v3
              </span>
            </div>

            <h1 className="text-5xl font-black tracking-tighter text-black uppercase italic">
              New <span className="text-[#A3E635]">Challenge</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed font-bold tracking-tight text-black/60 uppercase">
              Define a new habit trajectory and authorize secondary recruits to
              join the mission.
            </p>
          </div>

          {/* Form Section */}
          <div className="relative">
            {/* Subtle side accent */}
            <div className="absolute top-0 -left-12 hidden h-full w-1 bg-black/5 lg:block"></div>

            <CreateChallengeForm role={session.user.role} />
          </div>

          {/* Footer Sleek Note */}
          <div className="mt-12 flex items-center gap-4 bg-black p-4 text-[#A3E635]">
            <div className="h-2 w-2 animate-pulse bg-[#A3E635]"></div>
            <p className="text-[10px] font-black tracking-widest uppercase">
              System Ready for Parameter Input
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
