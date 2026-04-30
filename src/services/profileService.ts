import { supabase } from "../lib/supabase";
import type { Profile } from "../types";

/**
 * Get or create a profile for a given username
 * @param username - The username to look up or create
 * @returns The profile object
 */
export async function getOrCreateProfile(username: string): Promise<Profile> {
  // Try to get existing profile
  const { data: existingProfile } = await supabase.from("profiles").select("*").eq("username", username).single();

  if (existingProfile) {
    return existingProfile as Profile;
  }

  // Create new profile if doesn't exist
  const { data: newProfile, error: insertError } = await supabase.from("profiles").insert({ username, xp: 0, quizzes_completed: 0 }).select().single();

  if (insertError) {
    console.error("Error creating profile:", insertError);
    throw insertError;
  }

  return newProfile as Profile;
}

/**
 * Update profile XP and quiz count after completing a quiz
 * @param profileId - The profile ID to update
 * @param xpEarned - XP earned from the quiz
 * @returns Updated profile
 */
export async function addQuizResult(profileId: string, topic: string, score: number, totalQuestions: number, xpEarned: number): Promise<void> {
  // Insert quiz result
  const { error: resultError } = await supabase.from("quiz_results").insert({
    profile_id: profileId,
    topic,
    score,
    total_questions: totalQuestions,
  });

  if (resultError) {
    console.error("Error saving quiz result:", resultError);
    throw resultError;
  }

  // Update profile XP and quiz count
  const { data: currentProfile } = await supabase.from("profiles").select("xp, quizzes_completed").eq("id", profileId).single();

  if (currentProfile) {
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        xp: currentProfile.xp + xpEarned,
        quizzes_completed: currentProfile.quizzes_completed + 1,
      })
      .eq("id", profileId);

    if (updateError) {
      console.error("Error updating profile:", updateError);
      throw updateError;
    }
  }
}

/**
 * Get current user's profile from localStorage
 * @returns Username or null if not set
 */
export function getStoredUsername(): string | null {
  return localStorage.getItem("lore-master-username");
}

/**
 * Store username in localStorage
 * @param username - The username to store
 */
export function setStoredUsername(username: string): void {
  localStorage.setItem("lore-master-username", username);
}

/**
 * Clear stored username (logout)
 */
export function clearStoredUsername(): void {
  localStorage.removeItem("lore-master-username");
}
