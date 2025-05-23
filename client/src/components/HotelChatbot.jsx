import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyARRi2vD6EvHpZPYGZyhlbV0aIG-RmaRME`,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }
      );

      const botReply = res.data.candidates[0].content.parts[0].text;
      const botMessage = { role: "model", text: botReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError("Error calling Gemini API. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f9fafb]">
      {/* Header */}
      <header className="bg-white border-b shadow-sm py-4 px-6 text-center text-2xl font-semibold text-blue-800 sticky top-0 z-20">
        WonderLust AI – Hotel Chat Assistant
      </header>

      {/* Main Chat Area */}
      <main className="flex-grow overflow-y-auto px-4 py-6 md:px-10">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Intro Card */}
          <div className="bg-blue-600 text-white rounded-xl px-6 py-4 shadow-md text-center">
            <h2 className="text-xl font-bold">Welcome to WonderLust Agent</h2>
            <p className="text-sm mt-1">Ask me anything about hotels, bookings, and more!</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md shadow text-sm">
              {error}
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md text-white text-sm md:text-base ${
                  msg.role === "user" ? "bg-blue-600 rounded-br-none" : "bg-green-600 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="text-center text-gray-500 text-sm">Gemini is typing...</div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer Input */}
      <footer className="bg-white border-t sticky bottom-0 z-20 py-4 px-4 md:px-10">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatBot;
