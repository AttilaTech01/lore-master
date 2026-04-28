# Lore-Master MVP Plan

## Project Overview

- **Name**: Lore-Master - AI-Powered Niche Quiz Engine
- **Stack**: Vite + React + TypeScript, Supabase (PostgreSQL + Auth)
- **AI**: Both OpenAI and Anthropic supported

## MVP Features

1. Topic Selection - User types niche topic
2. Quiz Generation - AI generates 5 questions with 4 multiple-choice answers
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
- [WIP] Step 6: Create AI generation service (both OpenAI + Anthropic)
- [x] Step 7: Build Quiz component with 5 questions × 4 multiple-choice answers
- [WIP] Step 8: Implement answer selection and scoring logic

### Phase 3: Verification & Feedback

- [ ] Step 9: Add hidden AI self-correction step (source citation)
- [ ] Step 10: Create XP tracking system
- [ ] Step 11: Build simple leaderboard with Supabase queries

### Phase 4: Polish

- [ ] Step 12: Add error handling and loading states
- [ ] Step 13: Apply basic styling

---

## Key Files to Create

### src/lib/supabase.ts

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### src/types/index.ts

```typescript
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  topic: string;
  questions: Question[];
  createdAt: string;
}

export interface UserScore {
  id: string;
  username: string;
  xp: number;
  quizzesCompleted: number;
  createdAt: string;
}
```

### src/services/aiGenerator.ts

- AI question generation service supporting both OpenAI and Anthropic
- Generates 5 questions with 4 multiple-choice answers per topic
- Includes verification/self-correction step
- Includes a demo mode that returns hardcoded questions if no API key is provided

### src/components/TopicInput.tsx

- Topic entry form
- User types niche topic (e.g., "Star Wars: The High Republic")

### src/components/Quiz.tsx

- Quiz display and scoring
- Shows one question at a time
- Tracks score and progress

### src/components/Leaderboard.tsx

- Simple leaderboard
- Displays top users by XP

---

## Database Schema (Supabase)

Nothing yet, but we will need at least the following tables:

- `user_scores`: id (UUID), username (text), xp (integer), quizzes_completed (integer), created_at (timestamp)
- `quiz_results`: id (UUID), user_id (UUID), topic (text), score (integer), total_questions (integer), created_at (timestamp)

### RLS Policies

- Users can read all scores
- Users can insert their own scores
- Users can update their own scores only

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

1. Add real Anthropic API key to .env (get from console.anthropic.com/settings/keys)
2. Create Supabase tables (user_scores, quiz_results)
3. Connect Leaderboard component to Supabase
4. Test with real AI-generated questions
