export default function LegalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 font-mono">
      <div className="mb-12 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center bg-black text-2xl font-black text-[#A3E635]">
          L
        </div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
          Legal <span className="text-zinc-400">Directives</span>
        </h1>
      </div>

      <div className="mb-12 border-4 border-black bg-zinc-100 p-6 shadow-[8px_8px_0px_0px_rgba(163,230,53,1)]">
        <h3 className="mb-2 font-black uppercase">TL;DR Protocol</h3>
        <p className="text-xs leading-tight font-bold uppercase">
          We own the platform. You own your data. Don't be a jerk. If you cheat
          on challenges, we ban you. Simple.
        </p>
      </div>

      <div className="space-y-12">
        <section className="border-l-8 border-black pl-8">
          <h2 className="mb-4 text-2xl font-black uppercase italic">
            01. User Intelligence (Data)
          </h2>
          <p className="leading-relaxed font-bold text-black/70">
            Habo processes habit metrics and proof of completion (images/files).
            By uploading evidence, you grant Habo a non-exclusive license to
            store and display this content within your selected challenge
            visibility scope.
          </p>
        </section>

        <section className="border-l-8 border-black pl-8">
          <h2 className="mb-4 text-2xl font-black uppercase italic">
            02. Premium Access
          </h2>
          <p className="leading-relaxed font-bold text-black/70">
            Habo "Pro" access is a recurring subscription. Refunds are handled
            via manual review within 7 days of deployment. Termination of
            account results in immediate loss of premium features.
          </p>
        </section>
      </div>
    </div>
  );
}
