"use server";

import { cookies } from "next/headers";
import { env } from "@/env";

export const createPaymentSession = async (challengeId: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/payments/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({ challengeId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to initiate payment");
  }

  // Return the Stripe URL so the client can perform the redirect
  return data.data; // This is the { url: "..." }
};
