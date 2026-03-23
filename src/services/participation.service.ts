import { env } from "@/env";
import { cookies } from "next/headers";

export const participationService = {
  getMyParticipations: async () => {
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

    return { data };
  },
};
