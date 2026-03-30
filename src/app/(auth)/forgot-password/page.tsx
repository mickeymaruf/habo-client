"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, ShieldQuestion, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast.error(error.message || "Something went wrong.");
      setIsLoading(false);
    } else {
      setIsSent(true);
      toast.success("RESET_LINK_SENT");
    }
  };

  return (
    <div className="flex min-h-[90vh] w-full flex-col items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:rounded-[40px]">
        {/* --- ALERT BANNER --- */}
        <div className="relative flex h-24 w-full items-center justify-between overflow-hidden border-b-4 border-black bg-[#C3B5FD] px-6">
          <div className="z-20 flex items-center gap-2 rounded-xl border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ShieldQuestion className="h-5 w-5 stroke-[3px] text-black" />
            <span className="text-[10px] font-black tracking-tighter text-black uppercase italic">
              Security_Portal
            </span>
          </div>
          <div className="absolute inset-0 z-0 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        </div>

        {/* --- CONTENT --- */}
        <div className="px-6 py-10 md:px-10">
          {!isSent ? (
            <>
              <div className="mb-8 space-y-2">
                <h1 className="text-4xl font-black tracking-tighter text-black uppercase italic">
                  Forgot_Pass?
                </h1>
                <p className="text-xs leading-tight font-bold text-black/40 uppercase">
                  Enter your email and we&apos;ll send you a recovery link to
                  get back on track.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">
                    Your Registered Email
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="EMAIL_ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 border-4 border-black bg-white px-4 text-sm font-black italic placeholder:text-zinc-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <Button
                  disabled={isLoading}
                  className={cn(
                    "h-16 w-full gap-3 border-4 border-black bg-black text-xl font-black tracking-tighter text-[#A3E635] uppercase italic transition-all hover:bg-[#A3E635] hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none",
                    isLoading && "opacity-50",
                  )}
                >
                  {isLoading ? (
                    "SENDING..."
                  ) : (
                    <>
                      Request Reset <Send className="h-5 w-5 stroke-[3px]" />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-[#A3E635] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="h-10 w-10 stroke-[3px] text-black" />
              </div>
              <h2 className="mb-2 text-3xl leading-none font-black tracking-tighter text-black uppercase italic">
                Link_Sent
              </h2>
              <p className="mb-8 text-xs font-bold text-black/40 uppercase">
                Check your inbox. If you don&apos;t see it, check your spam
                folder.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSent(false)}
                className="border-2 border-black font-black tracking-tight uppercase italic"
              >
                Try Another Email
              </Button>
            </div>
          )}

          {/* BACK TO LOGIN */}
          <Link
            href="/login"
            className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.2em] text-black/30 uppercase transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 stroke-[3px]" />
            Back to Login
          </Link>
        </div>
      </div>

      {/* BACKGROUND WATERMARK */}
      <div className="pointer-events-none fixed right-10 bottom-10 hidden opacity-[0.03] lg:block">
        <span className="text-[12rem] font-black italic">HABO_SEC</span>
      </div>
    </div>
  );
}
