import { env } from "@/env";
import { ApiResponse } from "@/types/api.types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const challengeService = {
  getAllChallenges: async <TData>(query?: {
    search?: string;
    category?: string;
    featured?: string;
  }): Promise<ApiResponse<TData>> => {
    const cookieStore = await cookies();

    const url = new URL(`${env.API_URL}/challenges`);

    if (query?.search) url.searchParams.append("search", query.search);
    if (query?.category) url.searchParams.append("category", query.category);
    if (query?.featured) url.searchParams.append("featured", query.featured);

    const res = await fetch(url.toString(), {
      next: { tags: ["challenges"] },
      headers: {
        Cookie: cookieStore.toString(),
      },
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
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/challenges/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["challenge"] },
    });

    if (res.status === 404) {
      notFound();
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch challenge");
    }

    return data;
  },
};
