import React from "react";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 font-mono transition-colors duration-200 dark:bg-zinc-950">
      <div className="flex flex-col gap-12 md:flex-row">
        {/* Main Feed */}
        <div className="flex-1 space-y-16">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic dark:text-white">
            Field{" "}
            <span className="bg-[#C3B5FD] px-4 text-black dark:bg-[#7c66dc] dark:text-white">
              Briefings
            </span>
          </h1>

          {[1, 2, 3].map((post) => (
            <article
              key={post}
              className="group border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[8px_8px_0px_0px_#27272a]"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="bg-black px-2 py-0.5 text-[10px] font-black text-white dark:bg-[#A3E635] dark:text-black">
                  04.20.26
                </span>
                <span className="text-[10px] font-black tracking-widest text-[#A3E635] uppercase dark:text-[#A3E635]/80">
                  PATCH_NOTES
                </span>
              </div>
              <h2 className="text-3xl leading-none font-black uppercase italic md:text-4xl dark:text-white">
                The New Evidence Verification System
              </h2>
              <p className="mt-4 text-lg font-bold text-black/60 dark:text-zinc-400">
                How we’re using AI to verify habit proof uploads while
                maintaining strict user privacy.
              </p>
              <button className="mt-6 border-2 border-black bg-black px-4 py-2 text-xs font-black text-white uppercase italic transition-all dark:border-[#A3E635] dark:bg-transparent dark:text-[#A3E635] dark:hover:bg-[#A3E635] dark:hover:text-black">
                Read Full Intel
              </button>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="w-full space-y-8 md:w-80">
          <div className="border-4 border-black bg-yellow-400 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[4px_4px_0px_0px_#27272a]">
            <h3 className="mb-4 text-xl font-black uppercase italic dark:text-white">
              Join the{" "}
              <span className="text-black dark:text-[#A3E635]">Legion</span>
            </h3>
            <p className="mb-4 text-sm font-bold dark:text-zinc-400">
              Get tactical habit advice delivered to your inbox weekly.
            </p>
            <input
              className="mb-2 w-full border-2 border-black bg-white p-2 font-black outline-none placeholder:text-black/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
              placeholder="EMAIL"
            />
            <button className="w-full bg-black p-2 text-xs font-black text-white uppercase transition-all hover:bg-black/80 dark:bg-[#A3E635] dark:text-black dark:hover:bg-[#A3E635]/90">
              Subscribe
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
