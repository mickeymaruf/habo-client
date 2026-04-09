"use client";

import { useForm } from "@tanstack/react-form";
import {
  Type,
  AlignLeft,
  Calendar,
  Tag,
  DollarSign,
  Sparkles,
  Zap,
} from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
        const payload = { ...value };
        if (!payload.isPremium) delete payload.price;

        await createChallenge(payload);

        toast.success("Creating Active!", { id });
        router.push("/challenges");
      } catch (error: any) {
        toast.error(error.message || "Deployment failed", { id });
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
      className="space-y-8"
    >
      <div className="space-y-6">
        <form.Field name="title">
          {(field) => (
            <AppField
              field={field}
              label="Title"
              placeholder="e.g. ALPHA_RUN_30"
              prepend={<Type className="h-5 w-5 text-black dark:text-white" />}
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <AppField
              field={field}
              label="Description"
              placeholder="Define the parameters of success..."
              prepend={
                <AlignLeft className="h-5 w-5 text-black dark:text-white" />
              }
            />
          )}
        </form.Field>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <form.Field name="durationDays">
            {(field) => (
              <AppField
                field={field}
                label="Duration (Days)"
                type="number"
                prepend={
                  <Calendar className="h-5 w-5 text-black dark:text-white" />
                }
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
                placeholder="Health / Logic"
                prepend={<Tag className="h-5 w-5 text-black dark:text-white" />}
              />
            )}
          </form.Field>
        </div>

        {role === "ADMIN" && (
          <div className="border-4 border-black bg-black/5 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="mb-4 text-[10px] font-black tracking-widest text-black/40 uppercase dark:text-zinc-500">
              Administrative Overrides
            </p>
            <form.Field name="isPremium">
              {(field) => (
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="isPremium"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="h-6 w-6 cursor-pointer appearance-none border-4 border-black bg-white transition-colors checked:bg-[#A3E635] dark:border-zinc-800 dark:bg-zinc-950 dark:checked:bg-[#A3E635]"
                    />
                    {field.state.value && (
                      <Zap className="pointer-events-none absolute left-1 h-4 w-4 text-black" />
                    )}
                  </div>
                  <label
                    htmlFor="isPremium"
                    className="flex cursor-pointer items-center gap-2 text-xs font-black tracking-tight text-black uppercase dark:text-white"
                  >
                    Premium
                  </label>
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => [state.values.isPremium]}>
              {([isPremium]) =>
                isPremium ? (
                  <div className="mt-6">
                    <form.Field name="price">
                      {(field) => (
                        <AppField
                          field={field}
                          label="Price (USD)"
                          type="number"
                          placeholder="0.00"
                          prepend={
                            <DollarSign className="h-5 w-5 text-black dark:text-white" />
                          }
                          onChangeOverride={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                        />
                      )}
                    </form.Field>
                  </div>
                ) : null
              }
            </form.Subscribe>
          </div>
        )}
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      >
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            isPending={isSubmitting}
            pendingLabel="Initializing..."
            disabled={!canSubmit}
            className="group relative flex w-full cursor-pointer items-center justify-center border-[4px] border-black bg-[#A3E635] py-6 text-base font-black tracking-tighter text-black uppercase italic transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none md:py-8 md:text-lg dark:border-zinc-800 dark:text-black"
          >
            Create
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
