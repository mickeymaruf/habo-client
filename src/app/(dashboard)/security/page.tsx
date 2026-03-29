"use client";

import { useForm } from "@tanstack/react-form";
import { EyeOff, Eye, Lock, ShieldCheck, RefreshCcw } from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import { useState } from "react";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { z } from "zod";

// 1. Define the Validation Schema
const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ChangePasswordForm() {
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (key: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onChange: passwordSchema,
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Verifying credentials...");

      const { error } = await authClient.changePassword({
        newPassword: value.newPassword,
        currentPassword: value.oldPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        return toast.error(error.message || "Failed to update password", {
          id,
        });
      }

      toast.success("Security credentials updated successfully", { id });
      form.reset();
    },
  });

  return (
    <div className="py-10">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="mx-auto max-w-xl space-y-8 rounded-[40px] border-4 border-black bg-white p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex items-center gap-4 border-b-4 border-black pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-black bg-[#A3E635]">
            <ShieldCheck className="h-6 w-6 stroke-[3px] text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase italic">
              Security Systems
            </h2>
            <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase">
              Update your authentication tokens
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Password */}
          <form.Field name="oldPassword">
            {(field) => (
              <AppField
                field={field}
                label="Current Password"
                type={showPasswords.old ? "text" : "password"}
                placeholder="••••••••"
                prepend={<Lock className="h-5 w-5 text-black" />}
                append={
                  <button type="button" onClick={() => toggleVisibility("old")}>
                    {showPasswords.old ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          <div className="h-[2px] w-full bg-black/5" />

          {/* New Password */}
          <form.Field name="newPassword">
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type={showPasswords.new ? "text" : "password"}
                placeholder="Enter new password"
                prepend={<Lock className="h-5 w-5 text-black" />}
                append={
                  <button type="button" onClick={() => toggleVisibility("new")}>
                    {showPasswords.new ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => (
              <AppField
                field={field}
                label="Confirm New Password"
                type={showPasswords.confirm ? "text" : "password"}
                placeholder="Repeat new password"
                prepend={<Lock className="h-5 w-5 text-black" />}
                append={
                  <button
                    type="button"
                    onClick={() => toggleVisibility("confirm")}
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting}
              pendingLabel="Syncing..."
              disabled={!canSubmit}
              className={cn(
                "group relative flex w-full items-center justify-center gap-3 rounded-2xl border-4 border-black py-8 text-xl font-black tracking-tighter uppercase italic transition-all",
                "bg-black text-[#A3E635] hover:bg-[#A3E635] hover:text-black",
                "shadow-[6px_6px_0px_0px_rgba(163,230,53,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-50 disabled:grayscale",
              )}
            >
              Update Password
              <RefreshCcw
                className={cn(
                  "h-5 w-5 stroke-[3px] transition-transform duration-500 group-hover:rotate-180",
                  isSubmitting && "animate-spin",
                )}
              />
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
