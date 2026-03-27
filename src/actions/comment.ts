"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { env } from "@/env";

// ✅ Create Comment / Reply
export const createComment = async ({
  challengeId,
  content,
  parentId,
}: {
  challengeId: string;
  content: string;
  parentId?: string;
}) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({ challengeId, content, parentId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create comment");
  }

  revalidateTag("comments", "max");

  return data;
};

// ✅ Like Comment
export const likeComment = async (commentId: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/comments/${commentId}/like`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to like comment");
  }

  revalidateTag("comments", "max");

  return data;
};

// ✅ Unlike Comment
export const unlikeComment = async (commentId: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/comments/${commentId}/like`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to unlike comment");
  }

  revalidateTag("comments", "max");

  return data;
};

// ✅ Delete Comment
export const deleteComment = async (commentId: string) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete comment");
  }

  revalidateTag("comments", "max");

  return data;
};
