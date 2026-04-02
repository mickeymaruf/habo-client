"use client";

import { useFormStatus } from "react-dom";
import { ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UnbanButton({ isBanned }: { isBanned: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border-2 border-black px-5 py-2 text-[10px] font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-70",
        isBanned ? "bg-[#A3E635] text-black" : "bg-black text-white",
      )}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> PROCESSING...
        </>
      ) : isBanned ? (
        <>
          <ShieldCheck className="h-4 w-4" /> UNBAN
        </>
      ) : (
        <>
          <ShieldAlert className="h-4 w-4" /> SUSPEND
        </>
      )}
    </button>
  );
}
