import { env } from "@/env";
import { ApiResponse } from "@/types/api.types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const participationService = {
  getMyParticipations: async <TData>(): Promise<ApiResponse<TData>> => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/participations/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["participations"] },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch participations");
    }

    return data;
  },
  getSingleParticipation: async <T>(id: string) => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/participations/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["participations"] },
    });

    if (res.status === 404) {
      notFound();
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch participation");
    }

    return { data: data.data as T };
  },
};
