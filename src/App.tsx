import { useState } from "react";
import { TopicInput } from "./components/TopicInput";
import { Quiz } from "./components/Quiz";
import { Leaderboard } from "./components/Leaderboard";
import { generateQuiz } from "./services/aiGenerator";
import type { Question } from "./types";
import "./App.css";

function App() {
  const [view, setView] = useState<"input" | "quiz">("input");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const handleGenerate = async (topic: string) => {
    setLoading(true);
    try {
      const result = await generateQuiz(topic);
      setQuestions(result.questions);
      setView("quiz");
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    }
    setLoading(false);
  };

  const handleComplete = (finalScore: number) => {
    setScore(finalScore);
    alert(`You got ${finalScore}/${questions.length} correct! +${finalScore * 10} XP`);
    setView("input");
  };

  return (
    <div className="app">
      <h1>Lore Master</h1>
      {view === "input" ? <TopicInput onSubmit={handleGenerate} isLoading={loading} /> : <Quiz questions={questions} onComplete={handleComplete} />}
      <Leaderboard />
    </div>
  );
}

export default App;
