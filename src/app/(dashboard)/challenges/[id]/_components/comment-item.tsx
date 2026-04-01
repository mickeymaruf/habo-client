"use client";

import { useState } from "react";
import { Comment } from "@/types/comment.types";
import { ThumbsUp, CornerDownRight, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { CommentInput } from "./comment-input";
import { likeComment, unlikeComment, deleteComment } from "@/actions/comment";

export default function CommentItem({
  comment,
  challengeId,
  isReply = false,
  currentUserId,
  isAdmin = false,
}: {
  comment: Comment;
  challengeId: string;
  isReply?: boolean;
  currentUserId?: string;
  isAdmin?: boolean;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.likedByMe);
  const [likeCount, setLikeCount] = useState<number>(
    comment._count?.likes || 0,
  );

  // Determine if the user has permission to delete
  const canDelete = isAdmin || currentUserId === comment.userId;

  const handleLike = async () => {
    const originalLiked = isLiked;
    const originalCount = likeCount;
    try {
      setIsLiked(!originalLiked);
      setLikeCount((prev) => (originalLiked ? prev - 1 : prev + 1));
      if (originalLiked) {
        await unlikeComment(comment.id, challengeId);
      } else {
        await likeComment(comment.id, challengeId);
      }
    } catch (error) {
      setIsLiked(originalLiked);
      setLikeCount(originalCount);
      console.error("Sync failed:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS COMMENT?")) return;
    try {
      await deleteComment(comment.id, challengeId);
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  return (
    <div className={`${isReply ? "flex gap-4 pl-6" : "space-y-6"}`}>
      {/* Visual indicator for replies */}
      {isReply && (
        <CornerDownRight className="mt-1 h-5 w-5 shrink-0 text-black/20" />
      )}

      <div className="flex-1 space-y-3">
        {/* Comment Body */}
        <div className={`${!isReply ? "border-l-4 border-black pl-6" : ""}`}>
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`${isReply ? "border-2 border-black" : "bg-[#A3E635]"} px-2 text-xs font-black uppercase italic`}
            >
              {comment.user.name.replace(/\s+/g, "_")}
            </span>
            <span className="text-[10px] font-bold text-black/40 uppercase">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>

            {/* Delete Trigger - Now aligned to the right in the action bar */}
            {canDelete && (
              <button
                onClick={handleDelete}
                className="ml-auto flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-red-600/40 uppercase hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                DELETE
              </button>
            )}
          </div>

          <p
            className={`${isReply ? "text-sm text-black/60" : "text-lg"} leading-tight font-bold uppercase`}
          >
            {comment.content}
          </p>

          <div className="mt-3 flex items-center gap-4">
            {/* Like Button - Works for both main comments and replies */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-[10px] font-black uppercase transition-colors ${
                isLiked ? "text-[#A3E635]" : "text-black hover:text-[#A3E635]"
              }`}
            >
              <ThumbsUp
                className={`h-3 w-3 ${isLiked ? "fill-current" : ""}`}
              />
              {likeCount} Likes
            </button>

            {/* Only allow replying to top-level comments to avoid infinite nesting depth */}
            {!isReply && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-[10px] font-black tracking-widest uppercase hover:underline"
              >
                {isReplying ? "Cancel_Reply" : "Reply_To_Thread"}
              </button>
            )}
          </div>
        </div>

        {/* Conditional Reply Input */}
        {isReplying && (
          <div className="ml-10">
            <CommentInput
              challengeId={challengeId}
              parentId={comment.id}
              onSuccess={() => setIsReplying(false)}
            />
          </div>
        )}

        {/* Nested Replies Rendering */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-10 space-y-6 border-l-2 border-black/10">
            {comment.replies.map((reply: any) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                challengeId={challengeId}
                isReply={true}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
