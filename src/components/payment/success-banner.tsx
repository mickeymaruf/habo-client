"use client";

import { useRouter, usePathname } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

export function SuccessBanner() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    router.replace(pathname);
  };

  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-3xl border-2 border-[#A3E635] bg-[#A3E635]/10 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#A3E635] text-black">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-black">Payment Confirmed!</h3>
          <p className="text-sm font-medium text-black/70">
            Welcome to the premium challenge. Your access is now fully unlocked.
          </p>
        </div>
      </div>
      <button onClick={handleClose} className="text-black/40 hover:text-black">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
