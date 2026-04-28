import { useState } from "react";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="topic-input">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a niche topic (e.g., Byzantine Art, Quantum Computing)"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !topic.trim()}>
        {isLoading ? "Generating..." : "Generate Quiz"}
      </button>
    </form>
  );
}
