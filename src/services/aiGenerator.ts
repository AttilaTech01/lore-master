import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

export async function generateQuiz(topic: string): Promise<{
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}> {
  const prompt = `Generate 5 multiple choice questions about "${topic}". 
For each question, provide:
- The question text
- 4 options (a-d)
- The correct answer index (0-3)
- A brief explanation of why the answer is correct

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
    return JSON.parse(content.text);
  }
  throw new Error("Unexpected response format");
}
