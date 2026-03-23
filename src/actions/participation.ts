"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { env } from "@/env";

export const joinChallenge = async (challengeId: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/participations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({ challengeId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to join challenge");
  }

  revalidateTag("participations", "max");

  return data;
};

export const leaveChallenge = async (challengeId: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/participations/${challengeId}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to leave challenge");
  }

  revalidateTag("participations", "max");

  return data;
};
