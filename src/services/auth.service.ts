import { cookies } from "next/headers";
import { env } from "@/env";
import { AuthSessionResponse } from "@/types/auth.types";

export const authService = {
  checkSession: async (): Promise<AuthSessionResponse | null> => {
    try {
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      // If there are no cookies at all, don't even bother hitting the API
      if (!cookieString) return null;

      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieString,
        },
        cache: "no-store",
        next: { tags: ["session"] },
      });

      // 1. Handle Guest/Logged-out state (401 or 404)
      if (res.status === 401 || res.status === 404) {
        return null;
      }

      // 2. Handle Server Errors (500, 502, 503)
      if (!res.ok) {
        console.error(`Auth API error: ${res.status}`);
        return null;
      }

      // 3. Parse JSON only after confirming the response is OK
      const data = await res.json();
      return data;
    } catch (error) {
      // 4. Handle Network Failures (DNS, Timeout, etc.)
      console.error("Failed to fetch session:", error);
      return null;
    }
  },

  getSession: async (): Promise<AuthSessionResponse> => {
    const session = await authService.checkSession();
    if (!session) {
      throw new Error("Authentication Required");
    }
    return session;
  },
};
