import { cookies } from "next/headers";
import { env } from "@/env";
import { TopChallenge, TopUser } from "@/types/leaderboard.types";

export const leaderboardService = {
  getTopChallenges: async (): Promise<TopChallenge[]> => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/leaderboard/top-challenges`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || `Failed to fetch top challenges (${res.status})`,
      );
    }

    return (data.data as TopChallenge[]) || [];
  },

  getTopUsers: async (): Promise<TopUser[]> => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/leaderboard/users`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || `Failed to fetch top users (${res.status})`,
      );
    }

    return (data.data as TopUser[]) || [];
  },
};
