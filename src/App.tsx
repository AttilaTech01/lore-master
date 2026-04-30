import { useState, useEffect } from "react";
import { TopicInput } from "./components/TopicInput";
import { Quiz } from "./components/Quiz";
import { Leaderboard } from "./components/Leaderboard";
import { generateQuiz } from "./services/aiGenerator";
import { calculateXp, getRankTitle, formatXp } from "./services/xpService";
import { getOrCreateProfile, addQuizResult, getStoredUsername, setStoredUsername } from "./services/profileService";
import type { Question, Profile } from "./types";
import "./App.css";

function App() {
  const [view, setView] = useState<"input" | "quiz">("input");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ score: number; xp: number } | null>(null);
  const [username, setUsername] = useState<string>("");
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [leaderboardRefresh, setLeaderboardRefresh] = useState(0);

  const loadProfile = async (name: string) => {
    try {
      const profile = await getOrCreateProfile(name);
      setCurrentProfile(profile);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  // Load stored username on mount
  useEffect(() => {
    const stored = getStoredUsername();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsername(stored);
      loadProfile(stored);
    } else {
      setShowUsernameInput(true);
    }
  }, []);

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
    setStoredUsername(name);
    setShowUsernameInput(false);
    loadProfile(name);
  };

  const handleGenerate = async (topic: string) => {
    setLoading(true);
    setResults(null);
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

  const handleComplete = async (score: number) => {
    const xpEarned = calculateXp(score, questions.length);
    const rank = getRankTitle(xpEarned);

    setResults({ score, xp: xpEarned });

    // Save to Supabase if we have a profile
    if (currentProfile) {
      try {
        await addQuizResult(currentProfile.id, "Generated Quiz", score, questions.length, xpEarned);
        // Reload profile to get updated XP
        await loadProfile(username);
        // Trigger leaderboard refresh
        setLeaderboardRefresh((prev) => prev + 1);
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
    }

    alert(`Quiz Complete!\n\n` + `Score: ${score}/${questions.length}\n` + `XP Earned: +${formatXp(xpEarned)}\n` + `Rank: ${rank}`);
    setView("input");
  };

  return (
    <div className="app">
      <h1>Lore Master</h1>

      {showUsernameInput ? (
        <div className="username-input">
          <p>Enter your username to start:</p>
          <input
            type="text"
            placeholder="Username"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUsernameSubmit((e.target as HTMLInputElement).value);
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector(".username-input input") as HTMLInputElement;
              if (input.value.trim()) {
                handleUsernameSubmit(input.value.trim());
              }
            }}
          >
            Start
          </button>
        </div>
      ) : (
        <>
          {currentProfile && (
            <div className="user-info-container">
              <span className="user-info-line">
                {currentProfile.username} {formatXp(currentProfile.xp)} {getRankTitle(currentProfile.xp)}
              </span>
            </div>
          )}
          {results && (
            <div className="last-score">
              Results: {results.score}/{questions.length} correct (+{formatXp(results.xp)})
            </div>
          )}
          {view === "input" ? <TopicInput onSubmit={handleGenerate} isLoading={loading} /> : <Quiz questions={questions} onComplete={handleComplete} />}
          <Leaderboard refreshTrigger={leaderboardRefresh} />
        </>
      )}
    </div>
  );
}

export default App;
