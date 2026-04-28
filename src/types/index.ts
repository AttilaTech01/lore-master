export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  topic: string;
  questions: Question[];
  createdAt: string;
}

export interface UserScore {
  id: string;
  username: string;
  xp: number;
  quizzesCompleted: number;
  createdAt: string;
}
