"use client";

import { useForm } from "@tanstack/react-form";
import { EyeOff, Mail, Eye, Lock, User, ArrowRight } from "lucide-react";
import AppField from "../shared/form/AppField";
import { useState } from "react";
import { signupZodSchema } from "@/zod/auth.validation";
import AppSubmitButton from "../shared/form/AppSubmitButton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: signupZodSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const id = toast.loading("Creating account...");

      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
        });

        if (error) {
          return toast.error(error.message, { id });
        }

        toast.success("Account created successfully!", { id });
        router.push("/challenges");
      } catch (error: any) {
        toast.error(error.message || "Something went wrong", { id });
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
      className="space-y-5"
    >
      {/* Name */}
      <form.Field name="name">
        {(field) => (
          <AppField
            field={field}
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            prepend={<User className="h-5 w-5 text-black" />}
          />
        )}
      </form.Field>

      {/* Email */}
      <form.Field name="email">
        {(field) => (
          <AppField
            field={field}
            label="Email"
            type="email"
            placeholder="Enter your email"
            prepend={<Mail className="h-5 w-5 text-black" />}
          />
        )}
      </form.Field>

      {/* Password */}
      <form.Field name="password">
        {(field) => (
          <AppField
            field={field}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            prepend={<Lock className="h-5 w-5 text-black" />}
            append={
              <span onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer text-black/40 hover:text-black" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer text-black/40 hover:text-black" />
                )}
              </span>
            }
          />
        )}
      </form.Field>

      {/* Confirm Password */}
      {/* <form.Field name="confirmPassword">
        {(field) => (
          <AppField
            field={field}
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            prepend={<Lock className="h-5 w-5 text-black" />}
            append={
              <span onClick={() => setShowConfirmPassword((v) => !v)}>
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer text-black/40 hover:text-black" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer text-black/40 hover:text-black" />
                )}
              </span>
            }
          />
        )}
      </form.Field> */}

      {/* Submit */}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      >
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            isPending={isSubmitting}
            pendingLabel="Enlisting..."
            disabled={!canSubmit}
            className={cn(
              "group relative mt-5 flex w-full items-center justify-center gap-3 rounded-none border-4 border-black py-8 text-lg font-black tracking-tighter uppercase italic transition-all",
              "bg-black text-white hover:bg-[#A3E635] hover:text-black",
              "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale",
            )}
          >
            Sign Up
            <ArrowRight className="h-5 w-5 stroke-[3px] transition-transform group-hover:translate-x-1" />
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
