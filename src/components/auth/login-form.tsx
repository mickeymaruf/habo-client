"use client";

import { useForm } from "@tanstack/react-form";
import { EyeOff, Mail, Eye, Lock, ArrowRight } from "lucide-react";
import AppField from "../shared/form/AppField";
import { useState } from "react";
import { loginZodSchema } from "@/zod/auth.validation";
import AppSubmitButton from "../shared/form/AppSubmitButton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginZodSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const id = toast.loading("Logining in.");

      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          return toast.error(error.message, { id });
        }

        toast.success("Logged in successfully", { id });
        router.push("/challenges");
      } catch (error: any) {
        toast.error(error.message || "An unexpected error occurred", { id });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      method="POST"
      action="#"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field name="email">
        {(field) => (
          <AppField
            field={field}
            label="Email"
            type="email"
            placeholder="Enter your Email Address"
            prepend={<Mail className="h-5 w-5 text-black" />}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <AppField
            field={field}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            aria-label={showPassword ? "Hide password" : "Show password"}
            prepend={<Lock className="h-5 w-5 text-black" />}
            append={
              <span onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? (
                  <EyeOff
                    className="h-5 w-5 cursor-pointer text-black/40 hover:text-black"
                    aria-hidden="true"
                  />
                ) : (
                  <Eye
                    className="h-5 w-5 cursor-pointer text-black/40 hover:text-black"
                    aria-hidden="true"
                  />
                )}
              </span>
            }
          />
        )}
      </form.Field>

      <div className="flex justify-start">
        <button
          type="button"
          className="text-[10px] font-black tracking-widest text-black/40 uppercase hover:text-black hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      >
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            isPending={
              isSubmitting
              // || isPending
            }
            pendingLabel="Logging In...."
            disabled={!canSubmit}
            className={cn(
              "group relative flex w-full items-center justify-center gap-3 rounded-none border-4 border-black py-8 text-lg font-black tracking-tighter uppercase italic transition-all",
              "bg-black text-white hover:bg-[#A3E635] hover:text-black",
              "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale",
            )}
          >
            Log In
            <ArrowRight className="h-5 w-5 stroke-[3px] transition-transform group-hover:translate-x-1" />
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
