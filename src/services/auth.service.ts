import { cookies } from "next/headers";
import { env } from "@/env";
import { AuthSessionResponse } from "@/types/auth.types";

export const authService = {
  getSession: async (): Promise<AuthSessionResponse> => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: { tags: ["session"] },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || `Failed to fetch session (${res.status})`,
      );
    }

    return data;
  },
};
