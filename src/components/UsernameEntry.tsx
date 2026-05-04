interface UsernameEntryProps {
  onSubmit: (username: string) => void;
}

export function UsernameEntry({ onSubmit }: UsernameEntryProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="username-input">
      <p>Enter your username to start:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required minLength={1} maxLength={50} />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
