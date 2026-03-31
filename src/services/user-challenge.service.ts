import { cookies } from "next/headers";
import { env } from "@/env";
import { ApiResponse } from "@/types/api.types";

export const userChallengeService = {
  getMyChallenges: async (): Promise<ApiResponse<any>> => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/users/my-challenges`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch your challenges");
    }

    return data;
  },
};
