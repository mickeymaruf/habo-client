"use client";

import { useForm } from "@tanstack/react-form";
import {
  Type,
  AlignLeft,
  Calendar,
  Tag,
  DollarSign,
  Settings2,
  Zap,
} from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateChallenge } from "@/actions/challenge";
import {
  UpdateChallengePayload,
  updateChallengeZodSchema,
} from "@/zod/challenge.validation";

interface EditChallengeFormProps {
  challenge: any;
  role: string;
}

export default function EditChallengeForm({
  challenge,
  role,
}: EditChallengeFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: challenge.title,
      description: challenge.description,
      durationDays: challenge.durationDays,
      category: challenge.category,
      isPremium: challenge.isPremium,
      featured: challenge.featured,
      price: challenge.price ?? undefined,
    } as UpdateChallengePayload,
    validators: {
      onChange: updateChallengeZodSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Syncing protocol changes...");
      try {
        const payload = { ...value };

        // Clean up price if the admin switches it to free
        if (!payload.isPremium) {
          payload.price = undefined;
        }

        await updateChallenge(challenge.id, payload);

        toast.success("Protocol Updated!", { id: toastId });
        router.push("/history");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || "Update failed", { id: toastId });
      }
    },
  });

  return (
    <form
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
              prepend={<Type className="h-5 w-5 text-black dark:text-white" />}
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <AppField
              field={field}
              label="Description"
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
                prepend={<Tag className="h-5 w-5 text-black dark:text-white" />}
              />
            )}
          </form.Field>
        </div>

        {/* ADMIN OVERRIDES BLOCK */}
        {role === "ADMIN" && (
          <div className="border-4 border-black bg-black/5 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-zinc-800 dark:bg-white/5 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
            <p className="mb-4 text-[10px] font-black tracking-widest text-black/40 uppercase dark:text-zinc-500">
              Administrative Control Level
            </p>

            <form.Field name="isPremium">
              {(field) => (
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="isPremium"
                      checked={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.checked);
                      }}
                      className="h-6 w-6 cursor-pointer appearance-none border-4 border-black bg-white transition-colors checked:bg-[#A3E635] dark:border-zinc-700 dark:bg-zinc-900"
                    />
                    {field.state.value && (
                      <Zap className="pointer-events-none absolute left-1 h-4 w-4 text-black" />
                    )}
                  </div>
                  <label
                    htmlFor="isPremium"
                    className="cursor-pointer text-xs font-black tracking-tight uppercase italic dark:text-white"
                  >
                    Premium
                  </label>
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => [state.values.isPremium]}>
              {([isPremium]) =>
                isPremium ? (
                  <div className="mt-6 border-t-2 border-black/10 pt-6 dark:border-white/10">
                    <form.Field name="price">
                      {(field) => (
                        <AppField
                          field={field}
                          label="Price (USD)"
                          type="number"
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
            pendingLabel="Syncing Protocol..."
            disabled={!canSubmit}
            className="group relative flex w-full border-[4px] border-black bg-[#A3E635] py-6 text-xl font-black text-black uppercase italic transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none md:py-8 dark:border-zinc-800 dark:shadow-[8px_8px_0px_0px_rgba(163,230,53,0.3)]"
          >
            <div className="flex items-center gap-3">
              <Settings2 className="h-6 w-6" />
              <span>Update Protocol</span>
            </div>
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
