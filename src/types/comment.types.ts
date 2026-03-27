export interface CommentLike {
  userId: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  challengeId: string;
  parentId: string | null;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  replies: Comment[];
  _count: {
    replies: number;
    likes: number;
  };
  likedByMe: boolean;
}
