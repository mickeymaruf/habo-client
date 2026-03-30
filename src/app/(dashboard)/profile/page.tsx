"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { User, Mail, Camera, Pencil, Check, X, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isEditing, setIsEditing] = useState(false);
  const user = session?.user;

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Updating profile...");
      try {
        const { error } = await authClient.updateUser({
          name: value.name,
        });

        if (error) throw new Error(error.message);

        toast.success("Profile synced successfully", { id });
        setIsEditing(false);
        router.refresh();
      } catch (err: any) {
        toast.error(err.message || "Failed to update", { id });
      }
    },
  });

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-10">
      {/* --- PROFILE CARD --- */}
      <div className="relative overflow-hidden rounded-[40px] border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        {/* Header Decor */}
        <div className="h-24 border-b-4 border-black bg-[#A3E635]" />

        <div className="p-8">
          {/* Avatar Section */}
          <div className="relative -mt-12 mb-6 flex items-end justify-between">
            <div className="group/avatar relative">
              <Avatar
                className={cn(
                  "h-32 w-32 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                  isEditing && "opacity-50 grayscale",
                )}
              >
                <AvatarImage src={user.image || ""} />
                <AvatarFallback className="bg-zinc-100 text-2xl font-black">
                  {user.name?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rotate-[-10deg] border-2 border-black bg-[#A3E635] px-2 py-0.5 text-[8px] font-black uppercase italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Coming Soon
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "flex h-12 items-center gap-2 border-4 border-black px-6 font-black tracking-tighter uppercase italic transition-all active:scale-95",
                isEditing
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-zinc-50",
              )}
            >
              {isEditing ? (
                <>
                  {" "}
                  <X className="h-4 w-4 stroke-[3px]" /> Cancel{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Pencil className="h-4 w-4 stroke-[3px]" /> Edit Profile{" "}
                </>
              )}
            </button>
          </div>

          {/* --- CONTENT AREA --- */}
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-black uppercase italic">
                  {user.name}
                </h1>
                <p className="flex items-center gap-2 font-bold text-black/40">
                  <Mail className="h-4 w-4" /> {user.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border-4 border-black p-4 transition-all hover:bg-[#A3E635]/10">
                  <p className="text-[10px] font-black tracking-widest text-black/40 uppercase">
                    Status
                  </p>
                  <p className="text-lg font-black uppercase italic">Active</p>
                </div>
                <div className="rounded-3xl border-4 border-black p-4 transition-all hover:bg-[#A3E635]/10">
                  <p className="text-[10px] font-black tracking-widest text-black/40 uppercase">
                    Member Since
                  </p>
                  <p className="text-lg font-black uppercase italic">
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* --- EDIT FORM --- */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <form.Field name="name">
                {(field) => (
                  <AppField
                    field={field}
                    label="Display Name"
                    placeholder="Enter your name"
                    prepend={<User className="h-5 w-5 text-black" />}
                  />
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <AppField
                    field={field}
                    label="Email Address"
                    disabled
                    prepend={<Mail className="h-5 w-5 text-black/20" />}
                  />
                )}
              </form.Field>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <AppSubmitButton
                    isPending={isSubmitting}
                    disabled={!canSubmit}
                    className="w-full border-4 border-black bg-[#A3E635] py-8 text-xl font-black text-black uppercase italic shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:text-white hover:shadow-none"
                  >
                    Save Changes <Check className="ml-2 h-6 w-6 stroke-[4px]" />
                  </AppSubmitButton>
                )}
              </form.Subscribe>
            </form>
          )}
        </div>
      </div>

      {/* --- DANGER ZONE --- */}
      <div className="flex justify-center">
        <button
          onClick={async () => {
            const { data, error } = await authClient.signOut();
            if (data?.success) {
              router.push("/login");
              return;
            }

            if (error) {
              toast.error(error.message);
            }
          }}
          className="group flex items-center gap-2 font-black tracking-widest text-red-500 uppercase transition-colors hover:text-red-600"
        >
          <LogOut className="h-5 w-5 stroke-[3px] transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </div>
  );
}
