import Anthropic from "@anthropic-ai/sdk";
import type { Question } from "../types";

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
  // Fallback demo mode if no valid API key
  if (!anthropic) {
    console.warn("No valid Anthropic API key - using demo mode");
    return {
      questions: [
        {
          id: crypto.randomUUID(),
          question: `What is a key aspect of ${topic}?`,
          options: ["Aspect A", "Aspect B", "Aspect C", "Aspect D"],
          correctAnswer: 0,
          explanation: "This is a demo question. Add your API key to .env for real questions.",
        },
        {
          id: crypto.randomUUID(),
          question: `Which of these relates to ${topic}?`,
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 1,
          explanation: "Demo mode - API key needed for real content.",
        },
        {
          id: crypto.randomUUID(),
          question: `True or False: ${topic} is well-documented.`,
          options: ["True", "False", "Depends", "Unknown"],
          correctAnswer: 2,
          explanation: "Demo fallback - real AI not connected.",
        },
        {
          id: crypto.randomUUID(),
          question: `What year did ${topic} emerge?`,
          options: ["1990s", "2000s", "2010s", "2020s"],
          correctAnswer: 0,
          explanation: "Demo placeholder question.",
        },
        {
          id: crypto.randomUUID(),
          question: `Who is associated with ${topic}?`,
          options: ["Person A", "Person B", "Person C", "Person D"],
          correctAnswer: 0,
          explanation: "Demo mode active.",
        },
      ],
    };
  }

  const prompt = `Generate 5 multiple choice questions about "${topic}". 
For each question, provide:
- The question text;
- 4 options (a-d);
- The correct answer index (0-3);
- A brief explanation of why the answer is correct.

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
