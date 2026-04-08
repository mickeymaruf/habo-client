"use client";

import { useForm } from "@tanstack/react-form";
import { Send, MapPin, Mail, MessageSquare, User, Tag } from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const form = useForm({
    defaultValues: {
      callsign: "",
      email: "",
      subject: "REPORT_BUG",
      intel: "",
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Establishing comm-link...");

      try {
        // FAKE LOADING FOR NOW
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // TODO: Implement actual contact action / email service here
        console.log("Transmission Data:", value);

        toast.success("Transmission successful. Intel received.", { id });
        form.reset();
      } catch (error: any) {
        toast.error("Transmission failed. Signal lost.", { id });
      }
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-12 md:grid-cols-12">
        {/* Left: Contact Form */}
        <div className="md:col-span-7">
          <div className="border-8 border-black bg-white p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] md:p-12">
            <h1 className="mb-8 text-5xl font-black tracking-tighter uppercase italic">
              Submit <span className="text-[#A3E635]">Ticket</span>
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-8"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <form.Field name="callsign">
                  {(field) => (
                    <AppField
                      field={field}
                      label="Callsign"
                      placeholder="NAME / CALLSIGN"
                      prepend={<User className="h-5 w-5 text-black" />}
                    />
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <AppField
                      field={field}
                      label="Email Address"
                      type="email"
                      placeholder="EMAIL_ADDR"
                      prepend={<Mail className="h-5 w-5 text-black" />}
                    />
                  )}
                </form.Field>
              </div>

              <form.Field name="subject">
                {(field) => (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-black/40 uppercase">
                      <Tag className="h-3 w-3" /> Intel Type
                    </label>
                    <select
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border-4 border-black bg-white p-4 text-sm font-bold uppercase outline-none focus:bg-[#A3E635]/10"
                    >
                      <option value="REPORT_BUG">REPORT_BUG</option>
                      <option value="FEATURE_REQ">FEATURE_REQ</option>
                      <option value="PREMIUM_BILLING">PREMIUM_BILLING</option>
                    </select>
                  </div>
                )}
              </form.Field>

              <form.Field name="intel">
                {(field) => (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-black/40 uppercase">
                      <MessageSquare className="h-3 w-3" /> Message
                    </label>
                    <textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-48 w-full border-4 border-black p-4 text-sm font-bold outline-none placeholder:text-zinc-300 focus:bg-[#A3E635]/10"
                      placeholder="INPUT INTEL HERE..."
                    />
                  </div>
                )}
              </form.Field>

              <form.Subscribe
                selector={(state) =>
                  [state.canSubmit, state.isSubmitting] as const
                }
              >
                {([canSubmit, isSubmitting]) => (
                  <AppSubmitButton
                    isPending={isSubmitting}
                    pendingLabel="Transmitting...."
                    disabled={!canSubmit}
                    className={cn(
                      "flex w-full items-center justify-center gap-3 border-4 border-black bg-black py-8 text-xl font-black text-[#A3E635] uppercase italic transition-all",
                      "shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                    )}
                  >
                    <Send className="h-6 w-6" /> EXECUTE_TRANSMISSION
                  </AppSubmitButton>
                )}
              </form.Subscribe>
            </form>
          </div>
        </div>

        {/* Right: Direct Channels */}
        <div className="space-y-8 md:col-span-5">
          <div className="border-4 border-black bg-[#A3E635] p-8 font-mono shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-6 text-2xl font-black uppercase italic">
              Direct Ops
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6" />
                <div>
                  <div className="text-xs font-black opacity-40">
                    ENCRYPTED EMAIL
                  </div>
                  <div className="font-black">OPS@HABO.DESIGN</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6" />
                <div>
                  <div className="text-xs font-black opacity-40">
                    HEADQUARTERS
                  </div>
                  <div className="font-black">
                    DISTRICT 14, NEXT_SERVER_CLUST_01
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-4 border-black bg-black p-8 text-white">
            <h4 className="mb-2 text-lg font-black uppercase italic">
              Response Protocol
            </h4>
            <p className="text-xs leading-relaxed font-bold tracking-tight uppercase opacity-70">
              Typical response latency: 24-48 hours. Priority given to Premium
              tier account holders. All intel is processed via secure channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
