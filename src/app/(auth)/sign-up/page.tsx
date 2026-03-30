"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import SignupForm from "@/components/auth/signup-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden bg-white font-mono selection:bg-[#A3E635] selection:text-black">
      {/* --- BACK BUTTON / ABORT PROTOCOL --- */}
      <Link
        href="/"
        className="group absolute top-4 left-4 z-50 flex items-center gap-2 border-2 border-black bg-white px-4 py-2 transition-all hover:-translate-y-1 hover:bg-[#A3E635] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none md:top-8 md:left-8"
      >
        <ArrowLeft className="h-4 w-4 stroke-[3px]" />
        <span className="text-[10px] font-black tracking-widest uppercase">
          Go.Home
        </span>
      </Link>

      {/* Background Large Text Decor */}
      <div className="pointer-events-none absolute top-0 left-[5%] z-0 select-none">
        <p className="text-[8rem] font-black tracking-tighter text-black/5 uppercase italic md:text-[15rem]">
          EVOLVE
        </p>
      </div>

      {/* Left Side: Form Container */}
      <div className="relative z-10 flex w-full flex-col lg:w-4/6">
        <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-24">
          <div className="w-full max-w-md rounded-none border-[4px] border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:border-[6px] md:p-10 md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            {/* Logo Section */}
            <div className="mb-12 border-b-4 border-black pb-6">
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                Habo <span className="text-[#A3E635]">_</span>
              </h1>
              <p className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">
                New.User.Registration
              </p>
            </div>

            {/* Welcome Text */}
            <div className="mb-10 space-y-1">
              <p className="text-xs font-black tracking-widest text-black/40 uppercase">
                Begin Initial Deployment
              </p>
              <h2 className="text-3xl font-black tracking-tighter text-black uppercase italic md:text-4xl">
                Create Account
              </h2>
            </div>

            <SignupForm />

            {/* Social Signups */}
            {/* <div className="mt-12">
              <div className="relative mb-8 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t-2 border-black/10"></span>
                </div>
                <span className="relative bg-white px-4 text-[10px] font-black tracking-widest text-black/40 uppercase">
                  Verify via Third-Party
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="flex cursor-pointer items-center justify-center border-4 border-black bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none">
                  <FcGoogle className="h-6 w-6" />
                </button>
                <button className="flex cursor-pointer items-center justify-center border-4 border-black bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none">
                  <FaApple className="h-6 w-6 text-black" />
                </button>
                <button className="flex cursor-pointer items-center justify-center border-4 border-black bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none">
                  <FaFacebookF className="h-6 w-6 text-blue-600" />
                </button>
              </div>
            </div> */}

            <p className="mt-10 text-center text-[10px] font-bold tracking-widest uppercase md:text-xs">
              Already Have One?{" "}
              <Link
                href="/login"
                className="text-black underline decoration-[#A3E635] decoration-4 underline-offset-4 hover:bg-[#A3E635]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Sleek Typography/Quote Area */}
      <div className="relative hidden w-2/6 border-l-[6px] border-black bg-[#A3E635] lg:block">
        <div className="absolute inset-0 z-0 [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center p-12">
          {/* Main Visual Block */}
          <div className="flex h-full max-h-[600px] w-full flex-col justify-between border-[6px] border-black bg-black p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="h-4 w-4 bg-[#A3E635]"></div>
                <div className="h-4 w-4 bg-[#A3E635]/50"></div>
              </div>
              <p className="text-[10px] font-black tracking-tighter text-[#A3E635] uppercase">
                Status: Initialization
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-6xl leading-none font-black tracking-tighter text-white uppercase italic">
                Build <br />
                The <br />
                <span className="text-[#A3E635]">Machine.</span>
              </h3>
              <p className="text-xs tracking-widest text-white/40 uppercase">
                // No excuses. <br />
                // No shortcuts.
              </p>
            </div>

            {/* New Quote Banner */}
            <div className="border-4 border-[#A3E635] bg-transparent p-5">
              <p className="mb-2 text-[10px] font-bold tracking-widest text-white/50 uppercase">
                Mission Directive:
              </p>
              <p className="text-2xl leading-tight font-black tracking-tighter text-white uppercase italic">
                "Intensity is <br />
                the <span className="text-[#A3E635]">Requirement.</span>"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
