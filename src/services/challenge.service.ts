import { env } from "@/env";
import { ApiResponse } from "@/types/api.types";

export const challengeService = {
  getAllChallenges: async <TData>(query?: {
    search?: string;
    category?: string;
  }): Promise<ApiResponse<TData>> => {
    const url = new URL(`${env.API_URL}/challenges`);

    if (query?.search) url.searchParams.append("search", query.search);
    if (query?.category) url.searchParams.append("category", query.category);

    const res = await fetch(url.toString(), {
      next: { tags: ["challenges"] },
      // credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch challenges");
    }

    return data;
  },

  getSingleChallenge: async <TData>(
    id: string,
  ): Promise<ApiResponse<TData>> => {
    const res = await fetch(`${env.API_URL}/challenges/${id}`, {
      next: { tags: ["challenge"] },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch challenge");
    }

    return data;
  },
};
