export default function AppLoader() {
  return (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-6">
      {/* THE BRUTALIST BAR */}
      <div className="relative h-4 w-48 overflow-hidden border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:h-6 md:w-64 dark:border-zinc-800 dark:bg-zinc-900/50 dark:backdrop-blur-sm">
        {/* The Moving Progress Segment */}
        <div className="absolute inset-y-0 left-0 w-1/3 animate-[progress_1.5s_infinite_linear] border-r-4 border-black bg-[#A3E635] dark:border-zinc-800" />
      </div>

      {/* MINIMAL STATUS */}
      <span className="animate-pulse text-[10px] font-black tracking-[0.3em] text-black uppercase italic dark:text-zinc-400">
        Syncing_Habo
      </span>
    </div>
  );
}
