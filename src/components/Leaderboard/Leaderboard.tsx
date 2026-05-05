import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Profile } from "../../types";
import { delay } from "../../utils/utils";
import "./Leaderboard.css";

interface LeaderboardProps {
  refreshTrigger?: number;
}

export function Leaderboard({ refreshTrigger = 0 }: LeaderboardProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      if (import.meta.env.DEV) await delay(3000);
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

  return (
    <div className="card leaderboard">
      <h2>🏆 Leaderboard</h2>
      {loading ? (
        <div className="loading-placeholder">
          <span className="loading-line"></span>
          <span className="loading-line"></span>
          <span className="loading-line"></span>
        </div>
      ) : (
        <ol>
          {profiles.map((profile) => (
            <li key={profile.username}>
              <span className="rank">{profile.rank_title}</span> <span>{profile.username}</span> — <span>{profile.xp}xp</span> ({profile.quizzes_completed}{" "}
              quizzes)
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
