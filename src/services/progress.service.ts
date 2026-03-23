import { env } from "@/env";
import { cookies } from "next/headers";

export const progressService = {
  getProgress: async (participationId: string) => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/progress/${participationId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: { tags: ["progress"] },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch progress");
    }

    return { data };
  },
};
