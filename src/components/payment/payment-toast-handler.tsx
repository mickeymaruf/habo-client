"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function PaymentToastHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use a ref to ensure the toast only fires ONCE per session/mount
  const hasFired = useRef(false);

  useEffect(() => {
    const isSuccess = searchParams.get("success") === "true";
    const isCancelled = searchParams.get("cancelled") === "true";

    if ((isSuccess || isCancelled) && !hasFired.current) {
      hasFired.current = true;

      // --- SUCCESS ---
      if (isSuccess) {
        toast.success("Payment verified. Challenge Initialized", {
          duration: 5000,
        });
      }

      // --- CANCELLED ---
      if (isCancelled) {
        toast.error("Payment was cancelled", {
          duration: 5000,
        });
      }
      // --- URL CLEANUP ---
      const timeout = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("success");
        params.delete("cancelled");

        const newPath = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;

        router.replace(newPath, { scroll: false });
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams, router, pathname]);

  return null;
}
