# Lore-Master: AI-Powered Niche Quiz Engine

### Context

**The Problem**: Existing trivia apps suffer from "The Wikipedia Plateau"—questions are either too generic or repetitive.<br>
**The Solution**: Lore-Master acts as a "Dungeon Master for Trivia," utilizing RAG (Retrieval-Augmented Generation) to ensure that even the most obscure facts about 1990s F1 aerodynamics or The Silmarillion are factually grounded and infinitely varied.

### Key Features

- **AI Question Generation:** Integration with LLMs (OpenAI/Anthropic) to generate contextually accurate questions based on a user-provided topic or 'universe'.
- **Multi-Media Support:** AI-generated image-based questions or audio snippets (using Text-to-Speech) for a richer experience.
- **Social Competitive Hub:** Global leaderboards and 'Guild' systems where fans can compete for the title of 'Grand Maester' of a specific franchise.
- **Collaborative Fact-Checking:** Allow "Grand Maesters" to flag or verify AI questions, creating a community-driven data cleaning loop.

#### Game-changers

- **Adaptive Difficulty (ELO-based):** An algorithm that adjusts the obscurity of questions based on the user's historical performance.
- **Anti-Hallucination Layer:** A verification system that cross-references AI outputs against a trusted knowledge base to ensure trivia accuracy.

#### Ideas

- **The "Deep Lore" RAG Pipeline:** Instead of just hitting an LLM, allow users to upload a .txt or .pdf (like a fan-wiki export). The AI then generates questions only from that source. This solves the hallucination problem technically and impressively.
- **Proof of Knowledge (PoK) System:** Instead of just a score, give users a "Knowledge Graph" visualization of their expertise.

### Tech Stack

React.js, TypeScript, Supabase (PostgreSQL & Auth), CSS, ...

### Resume Impact

Demonstrates proficiency in Prompt Engineering, AI API integration, and managing real-time relational databases.

---

# MVP

### 1. Topic Selection

User types in a niche (e.g., "Star Wars: The High Republic").

### 2. Quiz Generation

AI generates 5 questions with 4 multiple-choice answers.

### 3. Verification

A hidden step where the AI "self-corrects" by citing a source before showing the user.

### 4. Feedback

User gets XP and climbs a simple Supabase-backed leaderboard.
