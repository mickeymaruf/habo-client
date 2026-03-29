import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:5000", // The base URL of your auth server

  // Use the current origin so the Next.js rewrite can proxy requests to the Express server,
  // preventing CORS issues and ensuring cookies are sent correctly on Vercel deployments.
  baseURL: typeof window !== "undefined" ? window.location.origin : "",

  fetchOptions: {
    credentials: "include",
  },
});
