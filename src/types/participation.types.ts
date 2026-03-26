import { Challenge } from "./challenge.type";
import { ChallengeStatus } from "./enum.types";
import { Progress } from "./progress.types";

export interface ChallengeWithoutParticipation {
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
}

export interface Participation {
  id: string;
  userId: string;
  challengeId: string;
  joinedAt: string;
  progress: number;
  completed: boolean;
  challenge: Challenge;
  progressLogs: Progress[];
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
}
