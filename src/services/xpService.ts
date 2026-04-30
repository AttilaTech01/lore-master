// XP thresholds for ranks (matching Supabase ranks table)
export const RANK_THRESHOLDS = [
  { title: "Novice", minXp: 0 },
  { title: "Apprentice", minXp: 100 },
  { title: "Scholar", minXp: 500 },
  { title: "Lore-Master", minXp: 1500 },
  { title: "Grand Maester", minXp: 5000 },
] as const;

export type RankTitle = (typeof RANK_THRESHOLDS)[number]["title"];

// XP calculation constants
const XP_PER_CORRECT_ANSWER = 10;
const PERFECT_SCORE_BONUS = 20;
const COMPLETION_BONUS = 5;

/**
 * Calculate XP earned from a quiz
 * @param score - Number of correct answers
 * @param totalQuestions - Total number of questions in the quiz
 * @returns XP earned from this quiz
 */
export function calculateXp(score: number, totalQuestions: number): number {
  // Base XP: 10 per correct answer
  let xp = score * XP_PER_CORRECT_ANSWER;

  // Perfect score bonus
  if (score === totalQuestions) {
    xp += PERFECT_SCORE_BONUS;
  }

  // Completion bonus (just for finishing)
  xp += COMPLETION_BONUS;

  return xp;
}

/**
 * Get the rank title based on total XP
 * @param totalXp - Total XP accumulated
 * @returns The rank title the user qualifies for
 */
export function getRankTitle(totalXp: number): RankTitle {
  let currentRank: RankTitle = "Novice";

  for (const rank of RANK_THRESHOLDS) {
    if (totalXp >= rank.minXp) {
      currentRank = rank.title;
    } else {
      break;
    }
  }

  return currentRank;
}

/**
 * Get XP needed to reach the next rank
 * @param currentXp - Current XP total
 * @returns XP needed for next rank, or null if at max rank
 */
export function getXpToNextRank(currentXp: number): number | null {
  for (const rank of RANK_THRESHOLDS) {
    if (currentXp < rank.minXp) {
      return rank.minXp - currentXp;
    }
  }
  // Already at max rank
  return null;
}

/**
 * Format XP display string
 * @param xp - XP amount
 * @returns Formatted string like "1,500 XP"
 */
export function formatXp(xp: number): string {
  return `${xp.toLocaleString()}xp`;
}
