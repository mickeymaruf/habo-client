import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // BASE_URL: z.url(),
    API_URL: z.url(),
    AUTH_URL: z.url(),
  },

  client: {
    // NEXT_PUBLIC_BASE_URL: z.url(),
  },

  runtimeEnv: {
    // BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,

    // NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
