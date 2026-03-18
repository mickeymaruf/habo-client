"use client";

import { useForm } from "@tanstack/react-form";
import { EyeOff, Mail, Eye, Lock } from "lucide-react";
import AppField from "../shared/form/AppField";
import { useState } from "react";
import { loginZodSchema } from "@/zod/auth.validation";
import AppSubmitButton from "../shared/form/AppSubmitButton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
        router.push("/dashboard");
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
            prepend={<Mail className="h-5 w-5 text-gray-400" />}
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
            prepend={<Lock className="h-5 w-5 text-gray-400" />}
            append={
              <span onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? (
                  <EyeOff
                    className="h-5 w-5 cursor-pointer text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <Eye
                    className="h-5 w-5 cursor-pointer text-gray-400"
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
          className="text-sm font-semibold text-blue-600 hover:underline"
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
            className="text-md w-full rounded-full bg-[#576fda] py-7 tracking-wide uppercase shadow-lg shadow-blue-200 hover:bg-[#4A63D8]"
          >
            Log In
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
