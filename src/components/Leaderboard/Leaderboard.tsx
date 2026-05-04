import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Profile } from "../../types";
import "./Leaderboard.css";

interface LeaderboardProps {
  refreshTrigger?: number;
}

export function Leaderboard({ refreshTrigger = 0 }: LeaderboardProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      // Query the leaderboard view
      const { data, error } = await supabase.from("leaderboard").select("*").order("xp", { ascending: false }).limit(10);

      if (error) {
        console.error("Error fetching leaderboard:", error);
      } else if (data) {
        setProfiles(data);
      }
      setLoading(false);
    }
    fetchLeaderboard();
  }, [refreshTrigger]);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="card leaderboard">
      <h2>🏆 Leaderboard</h2>
      <ol>
        {profiles.map((profile) => (
          <li key={profile.username}>
            <span className="rank">{profile.rank_title}</span> <span>{profile.username}</span> — <span>{profile.xp}xp</span> ({profile.quizzes_completed}{" "}
            quizzes)
          </li>
        ))}
      </ol>
    </div>
  );
}
