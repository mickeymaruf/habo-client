"use client";

import { useForm } from "@tanstack/react-form";
import { EyeOff, Mail, Eye, Lock, User } from "lucide-react";
import AppField from "../shared/form/AppField";
import { useState } from "react";
import { signupZodSchema } from "@/zod/auth.validation";
import AppSubmitButton from "../shared/form/AppSubmitButton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
        router.push("/dashboard");
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
      className="space-y-6"
    >
      {/* Name */}
      <form.Field name="name">
        {(field) => (
          <AppField
            field={field}
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            prepend={<User className="h-5 w-5 text-gray-400" />}
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
            prepend={<Mail className="h-5 w-5 text-gray-400" />}
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
            prepend={<Lock className="h-5 w-5 text-gray-400" />}
            append={
              <span onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer text-gray-400" />
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
            prepend={<Lock className="h-5 w-5 text-gray-400" />}
            append={
              <span onClick={() => setShowConfirmPassword((v) => !v)}>
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer text-gray-400" />
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
            pendingLabel="Signing Up..."
            disabled={!canSubmit}
            className="text-md mt-5 w-full rounded-full bg-[#576fda] py-7 tracking-wide uppercase shadow-lg shadow-blue-200 hover:bg-[#4A63D8]"
          >
            Sign Up
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
