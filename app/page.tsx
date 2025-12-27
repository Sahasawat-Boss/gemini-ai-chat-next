"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, `🧑‍💻 ${message}`]);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat((prev) => [...prev, `🤖 ${data.reply}`]);
    setMessage("");
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Gemini Chatbot</h1>

      <div className="w-full max-w-2xl border rounded-lg p-4 mb-4 h-[400px] overflow-y-auto">
        {chat.map((msg, i) => (
          <p key={i} className="mb-2 whitespace-pre-wrap">
            {msg}
          </p>
        ))}
        {loading && <p>🤖 Thinking...</p>}
      </div>

      <div className="flex w-full max-w-2xl gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </main>
  );
}
