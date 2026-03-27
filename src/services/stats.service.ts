import { cookies } from "next/headers";
import { env } from "@/env";
import { ApiResponse } from "@/types/api.types";
import { Stats } from "@/types/stats.types";

export const statsService = {
  getStats: async (): Promise<Stats> => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Failed to fetch stats (${res.status})`);
    }

    return data.data;
  },
};
