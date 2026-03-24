import { ChallengeStatus } from "./enum.types";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  category: string;
  isPremium?: boolean;
  featured?: boolean;
  price?: number | null;
  status: ChallengeStatus;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
    role: string;
    status: string;
    isDeleted: boolean;
    deletedAt: string | null;
  };
  participations: {
    id: string;
    userId: string;
    challengeId: string;
    joinedAt: string;
    progress: number;
    completed: boolean;
    user: {
      id: string;
      name: string;
      image: null;
    };
  }[];
  _count: {
    votes: number;
    comments: number;
    participations: number;
  };
}
