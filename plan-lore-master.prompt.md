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
- [ ] Step 3: Set up Supabase project and database schema
- [ ] Step 4: Configure environment variables

### Phase 2: Core Quiz Flow
- [ ] Step 5: Build TopicInput component for niche topic entry
- [ ] Step 6: Create AI generation service (both OpenAI + Anthropic)
- [ ] Step 7: Build Quiz component with 5 questions × 4 multiple-choice answers
- [ ] Step 8: Implement answer selection and scoring logic

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
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### src/types/index.ts
```typescript
export interface Question {
  id: string;
  content: string;
  options: Option[];
  correctAnswer: number;
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  topic: string;
  questions: Question[];
}

export interface Score {
  id: string;
  userId: string;
  score: number;
  xp: number;
  topic: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  totalXp: number;
  quizzesCompleted: number;
}
```

### src/services/aiGenerator.ts
- AI question generation service supporting both OpenAI and Anthropic
- Generates 5 questions with 4 multiple-choice answers per topic
- Includes verification/self-correction step

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

### Table: quiz_scores
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References auth.users |
| topic | text | Quiz topic |
| score | integer | Questions correct (0-5) |
| xp | integer | XP earned (score × 20) |
| created_at | timestamp | Submission time |

### RLS Policies
- Users can read all scores
- Users can insert their own scores
- Users can update their own scores only

---

## Environment Variables

### .env
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_OPENAI_API_KEY=your_openai_key
VITE_ANTHROPIC_API_KEY=your_anthropic_key
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
- **AI**: Both OpenAI and Anthropic supported - can switch via env vars
- **Real-time**: Skipped for MVP - leaderboard refreshes on page load
- **Auth**: Supabase Auth (email/password or anonymous for MVP)

---

## Next Steps

1. Create Supabase project at supabase.com
2. Get Project URL and anon key from Project Settings → API
3. Create the src/lib and src/types folders and files
4. Run the app and verify it loads