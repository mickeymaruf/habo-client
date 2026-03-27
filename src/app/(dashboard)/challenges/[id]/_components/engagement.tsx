import { commentService } from "@/services/comment.service";
import { Comment } from "@/types/comment.types";
import { CommentInput } from "./comment-input";
import CommentItem from "./comment-item";

export default async function Engagement({
  challengeId,
}: {
  challengeId: string;
}) {
  const comments =
    await commentService.getCommentsByChallenge<Comment[]>(challengeId);

  return (
    <div className="mt-20 space-y-10 border-t-8 border-black pt-16">
      {/* Main Comment Input */}
      <CommentInput challengeId={challengeId} />

      {/* Comment List */}
      <div className="space-y-10">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            challengeId={challengeId}
          />
        ))}
      </div>
    </div>
  );
}
