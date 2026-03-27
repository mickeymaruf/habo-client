import { env } from "@/env";
import { cookies } from "next/headers";

export const commentService = {
  getCommentsByChallenge: async <T>(challengeId: string) => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/comments/${challengeId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["comments"] },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch comments");
    }

    return data.data as T;
  },
};
