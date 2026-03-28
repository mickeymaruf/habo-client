export default function Footer() {
  return (
    <footer className="border-t-8 border-black bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 text-center md:flex-row md:text-left">
        <div>
          <p className="text-sm font-bold tracking-widest text-black uppercase">
            © 2026 HABO // Build Better Habits Together
          </p>
          <p className="mt-2 max-w-md text-xs font-medium tracking-wide text-black/60">
            Join challenges, stay accountable, track your streaks, and grow with
            a community committed to better daily habits.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black tracking-[0.3em] uppercase md:justify-end">
          <span className="text-black">Challenges</span>
          <span className="text-black">Leaderboard</span>
          <span className="text-black">Premium</span>
          <span className="text-black">Support</span>
        </div>
      </div>
    </footer>
  );
}
