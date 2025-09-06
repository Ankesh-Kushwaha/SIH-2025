import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const sustainabilityData = [
  { name: "Waste Reduction", impact: 85 },
  { name: "Tree Plantation", impact: 72 },
  { name: "Recycling", impact: 90 },
  { name: "Carbon Reduction", impact: 65 },
  { name: "Water Conservation", impact: 78 },
];

const AboutEchoVerse = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm EcoBot 🌱. Ask me anything about sustainability or EchoVerse!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let reply = "";

      if (input.toLowerCase().includes("sustainability")) {
        reply =
          "Sustainability means meeting our needs without compromising future generations. EchoVerse helps by gamifying eco-friendly habits.";
      } else if (input.toLowerCase().includes("goals")) {
        reply =
          "EchoVerse aligns with 6 UN Sustainable Development Goals 🌍: Clean Energy, Climate Action, Responsible Consumption, and more.";
      } else if (input.toLowerCase().includes("echoverse")) {
        reply =
          "EchoVerse is a gamified platform that teaches environmental awareness via quizzes, challenges, and real-world activities.";
      } else {
        reply =
          "I’m still learning 🌿, but EchoVerse helps you make eco-friendly choices every day!";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 700);

    setInput("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          About EchoVerse 🌿
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          EchoVerse is a gamified environmental education platform designed to
          make sustainability fun and engaging! Through quizzes, challenges,
          leaderboards, and community-driven activities, we empower users to
          contribute to a greener planet.
        </p>
      </motion.div>

      {/* Impact Bar Graph */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-10 max-w-5xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
          Our Impact on Sustainability 🌎
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={sustainabilityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip />
            <Bar
              dataKey="impact"
              fill="#4ade80"
              radius={[12, 12, 0, 0]}
              animationDuration={1800}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Chatbot Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-green-600" size={28} />
          <h2 className="text-2xl font-semibold text-green-700">
            EcoBot Chat 💬
          </h2>
        </div>

        <div className="h-72 overflow-y-auto bg-green-50 rounded-xl p-4 mb-4 border border-green-200">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs shadow-md ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask about sustainability or EchoVerse..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <Button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl"
          >
            Send
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutEchoVerse;
