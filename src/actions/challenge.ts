"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { env } from "@/env";

export const createChallenge = async (payload: any) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/challenges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create challenge");
  }

  revalidateTag("challenges", "max");

  return data;
};

export const updateChallenge = async (id: string, payload: any) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/challenges/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update challenge");
  }

  revalidateTag("challenges", "max");

  return data;
};

export const deleteChallenge = async (id: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/challenges/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete challenge");
  }

  revalidateTag("challenges", "max");

  return data;
};
