import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { UserScore } from "../types";

export function Leaderboard() {
  const [scores, setScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      const { data } = await supabase.from("user_scores").select("*").order("xp", { ascending: false }).limit(10);
      if (data) setScores(data);
      setLoading(false);
    }
    fetchScores();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <ol>
        {scores.map((user) => (
          <li key={user.id}>
            {user.username}: {user.xp} XP
          </li>
        ))}
      </ol>
    </div>
  );
}
