export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Profile {
  id: string;
  username: string;
  xp: number;
  quizzes_completed: number;
  created_at: string;
  rank_title?: string; // From the leaderboard view
}
