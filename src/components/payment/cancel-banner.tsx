"use client";

import { useRouter, usePathname } from "next/navigation";
import { XCircle, X } from "lucide-react";

export function CanceledBanner() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    router.replace(pathname);
  };

  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border-2 border-red-500/20 bg-red-50 p-4 text-red-600">
      <div className="flex items-center gap-2 font-semibold">
        <XCircle className="h-5 w-5" />
        <span>Payment was cancelled. You haven't been charged.</span>
      </div>

      <button
        onClick={handleClose}
        className="rounded-full p-1 transition-colors hover:bg-red-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
