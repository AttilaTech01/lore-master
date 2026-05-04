import { formatXp } from "../services/xpService";

interface QuizResultsSummaryProps {
  results: {
    score: number;
    xp: number;
  };
  totalQuestions: number;
}

export function QuizResultsSummary({ results, totalQuestions }: QuizResultsSummaryProps) {
  return (
    <div className="last-score">
      Results: {results.score}/{totalQuestions} correct (+{formatXp(results.xp)})
    </div>
  );
}
