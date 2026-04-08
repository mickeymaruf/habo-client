export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 font-mono">
      <div className="flex flex-col gap-12 md:flex-row">
        {/* Main Feed */}
        <div className="flex-1 space-y-16">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic">
            Field{" "}
            <span className="bg-[#C3B5FD] px-4 text-black">Briefings</span>
          </h1>

          {[1, 2, 3].map((post) => (
            <article
              key={post}
              className="group border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="bg-black px-2 py-0.5 text-[10px] font-black text-white">
                  04.20.26
                </span>
                <span className="text-[10px] font-black tracking-widest text-[#A3E635] uppercase">
                  PATCH_NOTES
                </span>
              </div>
              <h2 className="text-3xl leading-none font-black uppercase italic md:text-4xl">
                The New Evidence Verification System
              </h2>
              <p className="mt-4 text-lg font-bold text-black/60">
                How we’re using AI to verify habit proof uploads while
                maintaining strict user privacy.
              </p>
              <button className="mt-6 border-2 border-black bg-black px-4 py-2 text-xs font-black text-white uppercase italic">
                Read Full Intel
              </button>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="w-full space-y-8 md:w-80">
          <div className="border-4 border-black bg-yellow-400 p-6">
            <h3 className="mb-4 text-xl font-black uppercase italic">
              Join the Legion
            </h3>
            <p className="mb-4 text-sm font-bold">
              Get tactical habit advice delivered to your inbox weekly.
            </p>
            <input
              className="mb-2 w-full border-2 border-black bg-white p-2"
              placeholder="EMAIL"
            />
            <button className="w-full bg-black p-2 text-xs font-black text-white uppercase">
              Subscribe
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
