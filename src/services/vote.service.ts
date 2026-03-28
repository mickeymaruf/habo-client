import { env } from "@/env";
import { cookies } from "next/headers";

export const voteService = {
  getVoteCount: async <T>(challengeId: string) => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/votes/${challengeId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["votes", `votes-${challengeId}`] },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch vote count");
    }

    return data.data as T;
  },
};
