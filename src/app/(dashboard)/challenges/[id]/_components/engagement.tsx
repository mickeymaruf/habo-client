import { commentService } from "@/services/comment.service";
import { Comment } from "@/types/comment.types";
import { CommentInput } from "./comment-input";
import CommentItem from "./comment-item";
import { ThumbsUp } from "lucide-react";
import { VoteButton } from "./vote-button";

export default async function Engagement({
  challengeId,
  userId,
  votesCount,
  commentsCount,
  votedByMe,
}: {
  challengeId: string;
  userId: string;
  votesCount: number | undefined;
  commentsCount: number | undefined;
  votedByMe: boolean;
}) {
  const comments =
    await commentService.getCommentsByChallenge<Comment[]>(challengeId);

  return (
    <div className="mt-20 space-y-10 border-t-8 border-black pt-16">
      {/* Discussion Header with Vote Button */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-4xl font-black tracking-tighter text-black/80 uppercase italic">
            Discussions <span className="text-[#A3E635]">_</span>
          </h3>
          <div className="mt-2 flex items-center">
            {/* Responses highlight */}
            <span className="bg-black px-2 py-0.5 text-[10px] font-black tracking-widest text-[#A3E635] uppercase">
              {commentsCount || 0} Responses
            </span>
            <span className="ml-3 text-[10px] font-black tracking-[0.2em] text-black/20 uppercase">
              // COMMUNITY_ENGAGEMENT
            </span>
          </div>
        </div>

        <VoteButton
          challengeId={challengeId}
          initialVotes={votesCount || 0}
          initialHasVoted={votedByMe}
        />
      </div>

      {/* Main Comment Input */}
      <CommentInput challengeId={challengeId} />

      {/* Comment List */}
      <div className="space-y-10">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            challengeId={challengeId}
            currentUserId={userId}
          />
        ))}
      </div>
    </div>
  );
}
