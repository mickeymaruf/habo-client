import { cookies } from "next/headers";
import { env } from "@/env";

export const authService = {
  getSession: async () => {
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

    return { session: data };
  },
};
