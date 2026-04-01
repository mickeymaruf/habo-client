export interface TopChallenge {
  id: string;
  title: string;
  category: string;
  isPremium: boolean;
  participantCount: number;
  voteCount: number;
  commentCount: number;
  score: number;
  topParticipants: {
    image: string | null;
    name: string;
    streak: number;
    completionPercentage: number;
    currentDay: number;
  }[];
}

export interface TopUser {
  id: string;
  name: string;
  image: string | null;
  totalScore: number;
  challengesCompleted: number;
  activeCheckIns: number;
}
