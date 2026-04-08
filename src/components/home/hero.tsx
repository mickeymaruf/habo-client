export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-white py-16 font-mono md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <div className="mb-8 inline-block skew-x-[-12deg] border-4 border-black bg-black px-4 py-1 text-white md:px-6 md:py-2">
          <h2 className="text-lg font-black tracking-tighter uppercase italic md:text-xl">
            Social Habit Engineering
          </h2>
        </div>

        <h1 className="mb-6 text-5xl leading-none font-black tracking-tighter uppercase italic sm:text-7xl md:text-9xl">
          STOP
          <span className="ml-4 text-white [-webkit-text-stroke:2px_black] sm:ml-12 md:[-webkit-text-stroke:3px_black]">
            Dreaming
          </span>
          <br />
          <span className="text-[#A3E635] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Start
            <span className="ml-4 sm:ml-12">Doing</span>
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-tight font-bold tracking-tight text-black/60 uppercase md:text-xl">
          Habo is the ultimate Habit Protocol. Join public missions, track
          streak dynamics, and be top participants.
        </p>

        <div className="mx-auto flex max-w-lg flex-col justify-center gap-4 sm:flex-row sm:gap-6">
          <button className="flex-1 border-4 border-black bg-black px-6 py-4 text-xl font-black text-[#A3E635] uppercase italic shadow-[6px_6px_0px_0px_rgba(163,230,53,1)] transition-all hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(163,230,53,1)] active:translate-y-0.5 active:shadow-none md:px-10 md:py-5">
            Start.Mission
          </button>
          <button className="flex-1 border-4 border-black bg-white px-6 py-4 text-xl font-black text-black uppercase italic transition-all hover:bg-black/5 active:scale-95 md:px-10 md:py-5">
            Learn_More
          </button>
        </div>
      </div>

      {/* Background Patterns */}
      <div className="absolute inset-0 z-0 [background-image:radial-gradient(#000_2px,transparent_2px)] [background-size:24px_24px] opacity-10" />
      <div className="absolute bottom-[-10%] left-[-5%] h-40 w-40 rounded-full border-[12px] border-black opacity-10 blur-md md:h-60 md:w-60 md:border-[16px]" />
    </header>
  );
}
