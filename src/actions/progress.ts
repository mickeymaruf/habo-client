"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { env } from "@/env";

export const createProgress = async (payload: {
  participationId: string;
  note?: string;
}) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add progress");
  }

  // Revalidate cache
  revalidateTag("progress", "max");
  revalidateTag("participations", "max");

  return data;
};
