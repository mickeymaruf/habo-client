"use client";

import { useForm } from "@tanstack/react-form";
import {
  Type,
  AlignLeft,
  Calendar,
  Tag,
  DollarSign,
  Sparkles,
} from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { createChallenge } from "@/actions/challenge";
import {
  CreateChallengePayload,
  createChallengeZodSchema,
} from "@/zod/challenge.validation";

export default function CreateChallengeForm({ role }: { role: string }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      durationDays: 30,
      category: "",
      isPremium: false,
      featured: false,
      price: undefined,
    } as CreateChallengePayload,
    validators: {
      onChange: createChallengeZodSchema,
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Creating challenge...");
      try {
        // Ensure price is handled according to your Zod refine logic
        const payload = { ...value };
        if (!payload.isPremium) delete payload.price;

        await createChallenge(payload);

        toast.success("Challenge created!", { id });
        router.push("/challenges");
      } catch (error: any) {
        toast.error(error.message || "An error occurred", { id });
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
      <form.Field name="title">
        {(field) => (
          <AppField
            field={field}
            label="Title"
            placeholder="e.g. 30 Days of Running"
            prepend={<Type className="h-5 w-5 text-gray-400" />}
          />
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <AppField
            field={field}
            label="Description"
            placeholder="Describe the habit..."
            prepend={<AlignLeft className="h-5 w-5 text-gray-400" />}
          />
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="durationDays">
          {(field) => (
            <AppField
              field={field}
              label="Days"
              type="number"
              prepend={<Calendar className="h-5 w-5 text-gray-400" />}
              onChangeOverride={(e) =>
                field.handleChange(Number(e.target.value))
              }
            />
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <AppField
              field={field}
              label="Category"
              placeholder="Health"
              prepend={<Tag className="h-5 w-5 text-gray-400" />}
            />
          )}
        </form.Field>
      </div>

      {role === "ADMIN" && (
        <>
          <form.Field name="isPremium">
            {(field) => (
              <div className="flex items-center gap-3 p-2">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="isPremium"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <Sparkles className="h-4 w-4 text-blue-500" /> Premium
                  Challenge
                </label>
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.values.isPremium]}>
            {([isPremium]) =>
              isPremium ? (
                <form.Field name="price">
                  {(field) => (
                    <AppField
                      field={field}
                      label="Price"
                      type="number"
                      placeholder="0.00"
                      prepend={<DollarSign className="h-5 w-5 text-gray-400" />}
                      onChangeOverride={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  )}
                </form.Field>
              ) : null
            }
          </form.Subscribe>
        </>
      )}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      >
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            isPending={isSubmitting}
            pendingLabel="Creating..."
            disabled={!canSubmit}
            className="text-md w-full rounded-full bg-[#576fda] py-7 tracking-wide uppercase shadow-lg shadow-blue-200 hover:bg-[#4A63D8]"
          >
            Create Challenge
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
