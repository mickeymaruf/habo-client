"use client";

import { useState, useTransition } from "react";
import { Send, Loader2 } from "lucide-react";
import { createComment } from "@/actions/comment";

interface CommentInputProps {
  challengeId: string;
  parentId?: string;
  placeholder?: string;
  onSuccess?: () => void; // Added to close reply states
}

export function CommentInput({
  challengeId,
  parentId,
  placeholder,
  onSuccess,
}: CommentInputProps) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handlePost = async () => {
    if (!content.trim() || isPending) return;

    startTransition(async () => {
      try {
        await createComment({ challengeId, content, parentId });
        setContent("");
        // Call onSuccess to close the reply toggle in the parent
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("Failed to deploy intel:", error);
      }
    });
  };

  return (
    <div className="relative">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
        // Change placeholder dynamically if it's a reply
        placeholder={
          placeholder ||
          (parentId ? "DEPLOY REPLY..." : "DEPLOY YOUR THOUGHTS...")
        }
        className={`w-full rounded-none border-4 border-black bg-zinc-50 font-bold tracking-tight uppercase placeholder:text-black/20 focus:bg-white focus:ring-0 focus:outline-none disabled:opacity-50 ${
          parentId ? "p-4 text-sm" : "p-6 text-base"
        }`}
        rows={parentId ? 2 : 3} // Shorter box for replies
      />
      <button
        onClick={handlePost}
        disabled={isPending || !content.trim()}
        className={`absolute right-4 bottom-4 flex items-center gap-2 border-2 border-black bg-black px-6 py-2 text-[10px] font-black text-[#A3E635] uppercase shadow-[4px_4px_0px_0px_rgba(163,230,53,1)] transition-all hover:bg-[#A3E635] hover:text-black active:translate-y-1 active:shadow-none disabled:bg-zinc-800 disabled:shadow-none ${
          parentId ? "px-4 py-1.5" : "px-6 py-2"
        }`}
      >
        {isPending ? (
          <>
            SENDING... <Loader2 className="h-3 w-3 animate-spin" />
          </>
        ) : (
          <>
            {parentId ? "Reply_Intel" : "Send_Intel"}{" "}
            <Send className="h-3 w-3" />
          </>
        )}
      </button>
    </div>
  );
}
