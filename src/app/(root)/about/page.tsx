import { ShieldCheck, Zap, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 px-4 py-20 font-mono">
      <section className="space-y-6">
        <h1 className="text-6xl font-black tracking-tighter uppercase italic md:text-8xl">
          THE <span className="text-[#A3E635]">MANIFESTO</span>
        </h1>
        <p className="text-xl leading-tight font-bold text-black/80 md:text-2xl">
          Habo isn't a "habit tracker." It's a high-performance deployment
          system for your life. We stripped away the soft edges and the
          gradients to focus on what matters: execution.
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-3">
        {[
          {
            icon: Zap,
            title: "Velocity",
            desc: "No fluff. Just fast tracking.",
          },
          {
            icon: ShieldCheck,
            title: "Discipline",
            desc: "Built for the consistent.",
          },
          {
            icon: Users,
            title: "Legion",
            desc: "A community of high-performers.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <item.icon className="mb-4 h-10 w-10 text-[#A3E635]" />
            <h3 className="text-xl font-black uppercase italic">
              {item.title}
            </h3>
            <p className="text-sm font-bold text-black/60 uppercase">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
