export default function LegalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 font-mono transition-colors duration-200 dark:bg-zinc-950">
      <div className="mb-12 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center bg-black text-2xl font-black text-[#A3E635] dark:bg-[#A3E635] dark:text-black">
          L
        </div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic dark:text-white">
          Legal{" "}
          <span className="text-zinc-400 dark:text-zinc-600">Directives</span>
        </h1>
      </div>

      <div className="mb-12 border-4 border-black bg-zinc-100 p-6 shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[8px_8px_0px_0px_#27272a]">
        <h3 className="mb-2 font-black uppercase dark:text-[#A3E635]">
          TL;DR Protocol
        </h3>
        <p className="text-xs leading-tight font-bold uppercase dark:text-zinc-300">
          We own the platform. You own your data. Don't be a jerk. If you cheat
          on challenges, we ban you. Simple.
        </p>
      </div>

      <div className="space-y-12">
        <section className="border-l-8 border-black pl-8 dark:border-zinc-800">
          <h2 className="mb-4 text-2xl font-black uppercase italic dark:text-white">
            01. User Intelligence (Data)
          </h2>
          <p className="leading-relaxed font-bold text-black/70 dark:text-zinc-400">
            Habo processes habit metrics and proof of completion (images/files).
            By uploading evidence, you grant Habo a non-exclusive license to
            store and display this content within your selected challenge
            visibility scope.
          </p>
        </section>

        <section className="border-l-8 border-black pl-8 dark:border-zinc-800">
          <h2 className="mb-4 text-2xl font-black uppercase italic dark:text-white">
            02. Premium Access
          </h2>
          <p className="leading-relaxed font-bold text-black/70 dark:text-zinc-400">
            Habo "Pro" access is a recurring subscription. Refunds are handled
            via manual review within 7 days of deployment. Termination of
            account results in immediate loss of premium features.
          </p>
        </section>
      </div>
    </div>
  );
}
