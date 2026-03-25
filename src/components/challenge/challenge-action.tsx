"use client";

import { deleteChallenge } from "@/actions/challenge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ChallengeAction({
  challengeId,
}: {
  challengeId: string;
}) {
  const router = useRouter();

  return (
    <div className="my-10 flex justify-center">
      <Button
        onClick={() => {
          if (
            confirm(
              "Are you sure you want to delete this challenge? This action cannot be undone.",
            )
          ) {
            deleteChallenge(challengeId)
              .then(() => {
                toast.success("Challenge deleted successfully");
                router.push("/challenges");
              })
              .catch((error) => {
                console.error("Failed to delete challenge", error);
                toast.error("Failed to delete challenge. Please try again.");
              });
          }
        }}
        size="lg"
        variant="destructive"
        className="flex cursor-pointer items-center gap-2 rounded-full bg-[#D10000] text-white hover:bg-red-600 sm:w-fit"
      >
        <Trash2 className="h-4 w-4" />
        Delete Challenge
      </Button>
    </div>
  );
}
