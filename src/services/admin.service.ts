import { cookies } from "next/headers";
import { env } from "@/env";
import { ApiResponse } from "@/types/api.types";
import { AdminPaymentData, BannedChallenge } from "@/types/admin.types";

export const adminService = {
  getAllPayments: async (): Promise<ApiResponse<AdminPaymentData>> => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/admin/payments`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || `Failed to fetch admin payments (${res.status})`,
      );
    }

    return data;
  },

  getBannedChallenges: async (): Promise<ApiResponse<BannedChallenge[]>> => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/admin/challenges/banned`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: { tags: ["banned-challenges"] },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || `Failed to fetch admin challenges (${res.status})`,
      );
    }

    return data;
  },
};
