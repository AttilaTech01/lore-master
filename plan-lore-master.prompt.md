# Lore-Master MVP Plan

## Project Overview

- **Name**: Lore-Master - AI-Powered Niche Quiz Engine
- **Stack**: Vite + React + TypeScript, Supabase (PostgreSQL + Auth)
- **AI**: Anthropic supported (work on OpenAI support later)

## MVP Features

1. Topic Selection - User types niche topic
2. Quiz Generation - AI generates 5 questions with 4 multiple-choice answers (Mock data are given as fallback)
3. Verification - AI self-correction with source citation
4. Feedback - XP system + Supabase-backed leaderboard

---

## Implementation Phases

### Phase 1: Project Setup

- [x] Step 1: Initialize Vite + React + TypeScript project
- [x] Step 2: Install dependencies (@supabase/supabase-js, openai, @anthropic-ai/sdk)
- [x] Step 3: Set up Supabase project and database schema
- [x] Step 4: Configure environment variables

### Phase 2: Core Quiz Flow

- [x] Step 5: Build TopicInput component for niche topic entry
- [WIP] Step 6: Create AI generation service (Anthropic only)
- [x] Step 7: Build Quiz component with 5 questions × 4 multiple-choice answers
- [x] Step 8: Implement answer selection and scoring logic

### Phase 3: Verification & Feedback

- [ ] Step 9: Add hidden AI self-correction step (source citation)
- [WIP] Step 10: Create XP tracking system with a notion of dynamic XP rewards based on question difficulty and user performance
- [x] Step 11: Build simple leaderboard with Supabase queries

### Phase 4: Polish

- [ ] Step 12: Add error handling and loading states
- [ ] Step 13: Apply basic styling

---

## Database Schema (Supabase)

### Table: profiles

| Column            | Type        | Description                     |
| ----------------- | ----------- | ------------------------------- |
| id                | UUID        | Primary key (gen_random_uuid()) |
| username          | TEXT        | Unique player name              |
| xp                | INTEGER     | Total XP earned (default 0)     |
| quizzes_completed | INTEGER     | Number of quizzes completed     |
| created_at        | TIMESTAMPTZ | Creation timestamp              |

### Table: quiz_results

| Column          | Type        | Description                           |
| --------------- | ----------- | ------------------------------------- |
| id              | UUID        | Primary key                           |
| profile_id      | UUID        | Foreign key → profiles(id)            |
| topic           | TEXT        | Quiz topic (e.g., "The Silmarillion") |
| score           | INTEGER     | Correct answers                       |
| total_questions | INTEGER     | Total questions (5)                   |
| created_at      | TIMESTAMPTZ | Submission timestamp                  |

### Table: ranks

| Column   | Type    | Description                                                          |
| -------- | ------- | -------------------------------------------------------------------- |
| id       | UUID    | Primary key                                                          |
| title    | TEXT    | Rank title (Novice, Apprentice, Scholar, Lore-Master, Grand Maester) |
| min_xp   | INTEGER | XP threshold to unlock                                               |
| icon_url | TEXT    | Optional badge URL                                                   |

### View: leaderboard

- Joins profiles with ranks to show username, xp, quizzes_completed, and rank_title
- Ordered by xp DESC

### RLS Policies

- "Public read access for scores" — SELECT on profiles
- "Users can insert their own scores" — INSERT on profiles
- "Users can update their own scores" — UPDATE on profiles
- "Public read access for attempts" — SELECT on quiz_results
- "Users can insert their own attempts" — INSERT on quiz_results

---

## Mock Quizzes

| Key         | Theme                     |
| ----------- | ------------------------- |
| starwars    | Jedi, Sith, Force         |
| lotr        | Tolkien lore              |
| general     | Trivia (gold, WWII, etc.) |
| pokemon     | Pokemon games             |
| harrypotter | TEHarry Potter universe   |
| gaming      | Video game history        |

---

## Environment Variables

### .env

```
VITE_SUPABASE_URL=https://czhditheonadovrkzpji.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_KIE6nBEp7byzM-OsH_Fo9g_2ZEGKZ0w
VITE_ANTHROPIC_API_KEY=placeholder_anthropic_api_key_here
VITE_OPENAI_API_KEY=placeholder_openai_api_key_here
```

---

## Verification Checklist

- [ ] Run `npm run dev` and verify app loads
- [ ] Enter a test topic (e.g., "Star Wars: The High Republic")
- [ ] Complete a quiz and verify score calculates
- [ ] Check XP updates and leaderboard displays
- [ ] Test error handling (invalid topic, API failure)

---

## Decisions Made

- **Framework**: Vite + React (not Next.js)
- **AI**: Anthropic Claude 3 Haiku (demo mode until API key added)
- **Real-time**: Skipped for MVP - leaderboard refreshes on page load
- **Auth**: Supabase Auth not implemented yet (anonymous for MVP)
- **Question IDs**: Using crypto.randomUUID() for unique IDs
- **Typing**: Always type our variables and API responses for better maintainability, never use `any`

---

## Next Steps

1. Setup the XP logic system (define XP thresholds for ranks, calculate XP based on quiz performance) - In progress, aiming for a dynamic system that rewards harder questions more
2. Test the full quiz flow with mock data to ensure UI and logic work before integrating real AI generation
3. Add real Anthropic API key to .env (get from console.anthropic.com/settings/keys)
4. Test with real AI-generated questions
