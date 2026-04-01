"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { env } from "@/env";

export const banChallenge = async (id: string, reason?: string) => {
  const cookieStore = await cookies();
  const res = await fetch(`${env.API_URL}/admin/challenge/${id}/ban`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({ reason }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to ban challenge");
  }

  revalidateTag("challenges", "max");

  return data;
};

export const unbanChallenge = async (id: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/admin/challenge/${id}/unban`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to unban challenge");
  }

  revalidateTag("challenges", "max");
  revalidateTag("banned-challenges", "max");

  return data;
};
