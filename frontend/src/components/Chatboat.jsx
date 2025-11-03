/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
const url = import.meta.env.VITE_API_BASE_URL_WS;

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 **Hi! I'm EcoBot** 🌱\nAsk me anything about **sustainability, climate change, or Planet guardian**!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket(`${url}`);

    ws.current.onopen = () => console.log("✅ Connected to WebSocket server");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Handle streaming chunks
      if (data.type === "stream") {
        setIsTyping(true);
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];

          // If last message is already streaming → append new chunk
          if (lastMsg && lastMsg.sender === "bot" && lastMsg.isStreaming) {
            const updatedMsg = { ...lastMsg, text: lastMsg.text + data.text };
            return [...prev.slice(0, -1), updatedMsg];
          }

          // First streamed chunk
          return [
            ...prev,
            { sender: "bot", text: data.text, isStreaming: true },
          ];
        });
      }

      // Handle final structured response
      if (data.type === "final") {
        setIsTyping(false);
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];

          // If last message was streaming → replace it
          if (lastMsg && lastMsg.sender === "bot" && lastMsg.isStreaming) {
            return [
              ...prev.slice(0, -1),
              { sender: "bot", data: data.response },
            ];
          }

          // Otherwise, append the structured response
          return [...prev, { sender: "bot", data: data.response }];
        });
      }

      // Handle errors
      if (data.type === "error") {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.response.summary },
        ]);
      }

      scrollToBottom();
    };

    ws.current.onerror = (err) => console.error("❌ WebSocket Error:", err);
    ws.current.onclose = () => console.log("⚠️ WebSocket Closed");

    return () => ws.current?.close();
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    ws.current.send(input);
    setInput("");
    setIsTyping(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg border border-emerald-200 mt-8">
      <h2 className="text-3xl font-extrabold text-emerald-700 mb-4 flex items-center gap-2">
        🌎 EcoBot Chat <span className="text-lg">| Powered by Gemini</span>
      </h2>

      {/* Chat Window */}
      <div className="bg-white border border-emerald-300 rounded-xl p-4 h-96 overflow-y-auto shadow-inner">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`mb-4 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Bot Messages */}
            {msg.sender === "bot" ? (
              <div className="flex items-start max-w-[85%]">
                {/* Bot Avatar */}
                <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center mr-3 border-2 border-emerald-400">
                  🤖
                </div>

                {/* Bot Message Content */}
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 shadow-md text-gray-900">
                  {msg.data ? (
                    <>
                      {/* Summary */}
                      <h3 className="font-bold text-lg text-emerald-700">
                        🌿 Environmental Insight
                      </h3>
                      <p className="text-gray-800">{msg.data.summary}</p>

                      {/* Data Points */}
                      {msg.data.data_points &&
                        msg.data.data_points.length > 0 && (
                          <ul className="list-disc ml-4 text-gray-700 mt-2">
                            {msg.data.data_points.map((point, i) => (
                              <li key={i}>✅ {point}</li>
                            ))}
                          </ul>
                        )}

                      {/* References */}
                      {msg.data.sources && msg.data.sources.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-semibold text-emerald-700">
                            📌 References:
                          </h4>
                          <ul className="list-disc list-inside text-blue-600 underline">
                            {msg.data.sources.map((src, i) => (
                              <li key={i}>
                                <a
                                  href={src}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-800"
                                >
                                  {src} 🔗
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <ReactMarkdown>
                      {DOMPurify.sanitize(msg.text || "")}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ) : (
              /* User Messages */
              <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md max-w-[75%]">
                {msg.text}
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="text-emerald-600 italic">EcoBot is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="🌿 Ask me about sustainability, climate change, or Planet Guardian..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow p-3 border-2 border-emerald-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        <button
          onClick={handleSend}
          className="bg-emerald-600 m-2 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition shadow-md flex items-center gap-2"
        >
          🚀 Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
