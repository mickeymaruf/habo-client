"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { env } from "@/env";

// ✅ Upvote / Downvote Challenge (Upsert)
export const voteChallenge = async ({
  challengeId,
  value,
}: {
  challengeId: string;
  value: 1 | -1;
}) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({ challengeId, value }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to process vote");
  }

  // Revalidate both the general tag and the specific challenge tag
  revalidateTag(`votes-${challengeId}`, "max");

  return data;
};

// ✅ Remove Vote
export const removeVote = async (challengeId: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/votes/${challengeId}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to remove vote");
  }

  revalidateTag(`votes-${challengeId}`, "max");

  return data;
};
