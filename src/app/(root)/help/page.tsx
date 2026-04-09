import { Search, HelpCircle, CreditCard, Lock, User } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 transition-colors duration-200 dark:bg-zinc-950">
      <div className="mb-16 text-center">
        <h1 className="text-6xl font-black tracking-tighter uppercase italic dark:text-white">
          Support <span className="text-[#A3E635]">Center</span>
        </h1>
        <div className="relative mx-auto mt-8 max-w-xl">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 opacity-20 dark:text-white dark:opacity-40" />
          <input
            className="w-full border-4 border-black bg-white p-6 pl-12 font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all outline-none focus:bg-[#A3E635]/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:shadow-[8px_8px_0px_0px_#27272a] dark:placeholder:text-zinc-600 dark:focus:bg-[#A3E635]/5"
            placeholder="SEARCH PROTOCOLS..."
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {[
          {
            icon: User,
            title: "Account & Profile",
            items: ["Reset Password", "Change Callsign", "Social Links"],
          },
          {
            icon: CreditCard,
            title: "Premium & Billing",
            items: ["Upgrade to Pro", "Payment History", "Cancellation"],
          },
          {
            icon: Lock,
            title: "Privacy & Security",
            items: ["Data Erasure", "Private Challenges", "Encrypted Intel"],
          },
          {
            icon: HelpCircle,
            title: "Habit Mechanics",
            items: ["Streak Validation", "Voting System", "Proof Formats"],
          },
        ].map((cat, i) => (
          <div
            key={i}
            className="border-4 border-black p-8 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
          >
            <cat.icon className="mb-4 h-8 w-8 text-[#A3E635]" />
            <h3 className="mb-4 text-2xl font-black uppercase italic dark:text-zinc-100">
              {cat.title}
            </h3>
            <ul className="space-y-2 text-sm font-bold text-black/60 dark:text-zinc-500">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer underline decoration-[#A3E635] hover:text-black dark:hover:text-zinc-200"
                >
                  _ {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
