import Anthropic from "@anthropic-ai/sdk";
import type { Question } from "../types";
import { getRandomMockQuiz } from "../data/mockQuizzes";

interface RawAIResponse {
  questions: RawAIQuestion[];
}

interface RawAIQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
const hasValidKey = apiKey && !apiKey.includes("placeholder");

const anthropic = hasValidKey ? new Anthropic({ apiKey }) : null;

export async function generateQuiz(topic: string): Promise<{
  questions: Array<Question>;
}> {
  // Fallback mock quiz mode if no valid API key
  if (!anthropic) {
    console.warn("No valid Anthropic API key - using mock quiz mode");
    return {
      questions: getRandomMockQuiz(),
    };
  }

  const prompt = `Generate 5 multiple choice questions about "${topic}".  
  For each question, provide:
  - The question text;
  - 4 options (a-d);
  - The correct answer index (0-3);
  - A brief explanation of why the answer is correct, a one-sentence lore citation if possible.

  Return ONLY valid JSON in this exact format:
  {
    "questions": [
      {
        "question": "...",
        "options": ["a", "b", "c", "d"],
        "correctAnswer": 0,
        "explanation": "..."
      }
    ]
  }`;

  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.content[0];
  if (content.type === "text") {
    const parsed = JSON.parse(content.text) as RawAIResponse;
    // Add unique IDs to AI-generated questions
    return {
      questions: parsed.questions.map((q: RawAIQuestion) => ({
        id: crypto.randomUUID(),
        ...q,
      })),
    };
  }
  throw new Error("Unexpected response format");
}
