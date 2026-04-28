import { useState } from "react";
import type { Question } from "../types";

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="quiz">
      <div className="progress">
        Question {currentIndex + 1} of {questions.length}
      </div>
      <h2>{currentQuestion.question}</h2>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`option ${
              selectedAnswer !== null ? (index === currentQuestion.correctAnswer ? "correct" : index === selectedAnswer ? "incorrect" : "") : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="explanation">
          <p>{currentQuestion.explanation}</p>
          <button onClick={handleNext}>{isLastQuestion ? "See Results" : "Next Question"}</button>
        </div>
      )}
    </div>
  );
}
