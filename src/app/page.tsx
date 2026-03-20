import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Apple,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Clouds from "./Clouds";
import { FaCheck } from "react-icons/fa";
import FAQSection from "@/components/home/faq-section";
import Link from "next/link";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={cn(
        "font-roboto min-h-screen bg-white font-sans text-slate-900",
        figtree.className,
      )}
    >
      <div className="bg-[url('/Gemini_Generated_Image_m865k8m865k8m865.png')] bg-cover bg-center bg-no-repeat">
        {/* --- Navigation --- */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div className="text-2xl font-semibold tracking-tight text-white">
            Habo
          </div>
          <Button size="lg" className="border-none p-5 shadow-sm" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </nav>

        {/* --- Hero Section --- */}
        <section className="relative overflow-hidden px-4 pt-24 text-center">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1 className="mb-6 bg-linear-to-b from-slate-900 to-slate-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
              A friends for a <br /> wandering mind
            </h1>
            <p className="mb-8 text-lg text-slate-600">
              Habo helps you stay mindful and intentional while you work
            </p>
            <Button className="border-0 px-8 py-6 text-lg text-white shadow-sm">
              Start A Challange
            </Button>
          </div>

          {/* Placeholder for the main 3D Hero Illustration */}
          <div className="mt-10 mb-20">
            <img
              className="mx-auto w-full max-w-3xl"
              src="/Gemini_Generated_Image_3z8ir53z8ir53z8i-removebg.png"
              alt=""
            />
          </div>

          <div className="absolute -bottom-26 left-0 z-40 w-full">
            <Clouds
              sizes={[15, 20, 16, 18, 16, 14, 16, 12, 14, 16, 20]}
              colors={["#F8FAF9"]}
              justify="center"
            />
          </div>
          <div className="absolute bottom-0 left-0 z-50 w-full translate-y-1/2">
            <Clouds
              sizes={[15, 20, 16, 18, 16, 14, 16, 12, 14, 16, 20]}
              colors={["#fff"]}
              justify="center"
            />
          </div>
        </section>
      </div>

      {/* --- Feature 1: Reverse Pomodoro --- */}
      <section className="mx-auto grid w-full max-w-5xl items-center gap-12 bg-white px-8 py-24 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-xs font-bold text-orange-600">
            🔥 HOT FEATURE
          </span>
          <h2 className="mb-6 text-4xl font-bold">
            See, learn, understand and help your life
          </h2>
          <p className="mb-8 text-slate-500">
            Timers bring some structure by giving you a clear start point and an
            end point. This makes you more intentional.
          </p>
          <ul className="space-y-4">
            {[
              "Reverse Pomodoro",
              "Switch sessions early",
              "Unlimited Pomodoro sessions",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="rounded-full bg-green-500 p-1.5 font-medium">
                  <FaCheck className="h-3 w-3 text-white" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          Placeholder 1
        </div>
      </section>

      {/* --- Feature 2: Intervals --- */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 md:grid-cols-2">
        <div className="flex justify-center">Placeholder 2</div>
        <div>
          <span className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-1 text-xs font-bold text-purple-600">
            ✨ MAIN FEATURE
          </span>
          <h2 className="mb-6 text-4xl font-bold">
            Break your time into intervals with Pomodoro.
          </h2>
          <p className="mb-8 font-medium text-slate-500">
            Timers bring some structure by giving you a clear start point and an
            end point. This makes you more intentional.
          </p>
          <ul className="space-y-4">
            {[
              "Reverse Pomodoro",
              "Switch sessions early",
              "Unlimited Pomodoro sessions",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-5 w-5 text-green-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Mid-Page Banner --- */}
      <section className="text- relative flex h-[900px] min-h-screen items-center justify-center bg-[url('/Gemini_Generated_Image_t60llct60llct60l.png')] bg-cover bg-center bg-no-repeat py-20 text-center">
        <h1 className="bg-linear-to-b from-slate-900 to-slate-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
          And then, everything <br />
          becomes easy.
        </h1>
      </section>

      {/* --- Habit Guides --- */}
      <section className="mx-auto max-w-6xl px-8 py-28 text-center">
        <h2 className="mb-10 text-center text-3xl leading-14 font-bold text-[#111827] md:text-5xl">
          Guide to build a good <br /> habits and life a good life
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-slate-700">
          Rewired your brain and mindset by reading our expert, curated <br />
          resources, and articles for good habits building.
        </p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="group relative flex h-110 cursor-pointer flex-col justify-between overflow-hidden rounded-[35px] bg-slate-400 bg-[url('/Gemini_Generated_Image_c62ljuc62ljuc62l.png')] bg-cover bg-center bg-no-repeat p-8">
            <p className="z-10 text-left text-3xl leading-snug font-semibold text-white">
              Atomic <br /> habits: 101
            </p>

            <div className="w-fit rounded-full border-2 border-white p-1 text-white transition-transform group-hover:translate-x-2">
              <ChevronRight />
            </div>
          </div>
          <div className="group relative flex h-110 cursor-pointer flex-col justify-between overflow-hidden rounded-[35px] bg-slate-400 bg-[url('/Gemini_Generated_Image_73xlf573xlf573xl.png')] bg-cover bg-center bg-no-repeat p-8">
            <p className="z-10 text-left text-3xl leading-snug font-semibold text-white">
              How to <br /> manage <br /> Time
            </p>

            <div className="w-fit rounded-full border-2 border-white p-1 text-white transition-transform group-hover:translate-x-2">
              <ChevronRight />
            </div>
          </div>
          <div className="group relative flex h-110 cursor-pointer flex-col justify-between overflow-hidden rounded-[35px] bg-slate-400 bg-[url('/Gemini_Generated_Image_7cgm717cgm717cgm.png')] bg-cover bg-center bg-no-repeat p-8">
            <p className="z-10 text-left text-3xl leading-snug font-semibold text-white">
              Explore the <br /> world
            </p>

            <div className="w-fit rounded-full border-2 border-white p-1 text-white transition-transform group-hover:translate-x-2">
              <ChevronRight />
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <FAQSection />

      {/* --- Footer --- */}
      <footer className="relative flex h-50 items-center justify-center border-t border-slate-100 py-12 text-center text-slate-600">
        <div className="absolute z-10 my-auto h-fit w-full">
          <div className="mb-4 flex justify-center gap-8 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-slate-900">
              Developer
            </a>
            <a href="#" className="transition-colors hover:text-slate-900">
              Repository
            </a>
            <a href="#" className="transition-colors hover:text-slate-900">
              Discord
            </a>
            <a href="#" className="transition-colors hover:text-slate-900">
              Help
            </a>
          </div>

          <p className="mt-10 text-sm">© Copyright 2026 Habo</p>
        </div>

        <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-white">
          <div className="absolute top-20 left-10 h-4 w-4 rotate-45 transform rounded-sm bg-linear-to-br from-orange-300 to-orange-500 shadow-lg transition-transform hover:scale-110"></div>

          <div className="absolute bottom-16 left-24 h-3 w-3 rounded-full bg-linear-to-tr from-red-400 to-red-600 shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.2)]"></div>

          <div className="absolute bottom-10 left-32 h-5 w-5 skew-x-12 skew-y-12 bg-linear-to-br from-teal-200 to-teal-400 shadow-md"></div>

          <div className="absolute top-12 right-20 h-10 w-10 rounded-full bg-linear-to-tl from-blue-400 to-blue-600 opacity-80 shadow-xl blur-[1px]"></div>

          <div className="absolute right-32 bottom-12 h-6 w-6 rotate-12 bg-linear-to-b from-pink-200 to-pink-400 shadow-inner [clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]"></div>

          <div className="absolute right-10 bottom-8 h-2 w-6 rotate-[-15deg] rounded-full bg-linear-to-r from-yellow-300 to-yellow-500"></div>
        </div>
      </footer>
    </div>
  );
}
