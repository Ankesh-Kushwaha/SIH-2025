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
  { name: "Tree Plantation", impact: 70 },
  { name: "Recycling", impact: 90 },
  { name: "Carbon Reduction", impact: 65 },
  { name: "Water Conservation", impact: 75 },
];

const AboutEchoVerse = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm EcoBot. Ask me anything about sustainability or EchoVerse!",
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
          "EchoVerse aligns with 6 UN Sustainable Development Goals: Clean Energy, Climate Action, Responsible Consumption, and more.";
      } else if (input.toLowerCase().includes("echoverse")) {
        reply =
          "EchoVerse is a gamified platform that teaches environmental awareness via quizzes, challenges, and real-world activities.";
      } else {
        reply =
          "I’m still learning, but EchoVerse helps you make eco-friendly choices every day!";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 700);

    setInput("");
  };

  return (
    <div
      className="p-8"
      style={{
        backgroundColor: "#D1FAE5",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <style>
        {`
          .retro-card {
            background-color: #F0FFF4;
            border: 2px solid #10B981;
            box-shadow: 8px 8px 0px #10B981;
            border-radius: 12px;
            transition: all 0.3s ease;
          }
          .retro-card:hover {
            box-shadow: 12px 12px 0px #059669;
            transform: translate(-4px, -4px);
          }
          .retro-button {
            background-color: #10B981;
            color: white;
            border: 2px solid #059669;
            box-shadow: 4px 4px 0px #059669;
            transition: all 0.2s ease;
            border-radius: 8px;
          }
          .retro-button:hover {
            background-color: #059669;
            box-shadow: 2px 2px 0px #047857;
            transform: translate(2px, 2px);
          }
          .text-shadow {
            text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
          }
          .pixelated-icon {
            font-family: 'Material Icons';
            font-size: 28px;
            image-rendering: pixelated;
          }
          .chart-bar {
            background-color: #34D399;
            border: 2px solid #10B981;
            border-radius: 4px 4px 0 0;
            position: relative;
            transition: all 0.3s ease;
          }
          .chart-bar:hover {
            background-color: #10B981;
            transform: translateY(-5px);
          }
          .chart-bar::after {
            content: '';
            position: absolute;
            top: -6px;
            left: -2px;
            right: -2px;
            height: 4px;
            background-color: #6EE7B7;
            border-radius: 2px;
          }
        `}
      </style>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-emerald-700 text-shadow mb-4 flex items-center justify-center">
            About EchoVerse
            <span className="material-icons text-4xl ml-2 text-emerald-500">
              eco
            </span>
          </h1>
          <p className="text-lg text-emerald-600 max-w-3xl mx-auto">
            Echoverse is a gamified environmental education platform designed to
            make sustainability fun and engaging! Through quizzes, challenges,
            leaderboards, and community-driven activities, we empower users to
            contribute to a greener planet.
          </p>
        </div>

        {/* Impact Bar Graph */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 retro-card p-6"
        >
          <h2 className="text-3xl font-bold text-emerald-700 mb-6 flex items-center text-shadow">
            <span className="material-icons mr-2 text-emerald-500">
              insights
            </span>
            Our Impact on Sustainability
            <span
              className="material-icons text-blue-500 ml-2 cursor-pointer"
              title="Information"
            >
              help_outline
            </span>
          </h2>
          <div className="flex items-end justify-around h-64 border-l-4 border-b-4 border-gray-600 p-4 relative">
            <div className="absolute -left-8 text-gray-600 font-bold text-sm flex flex-col justify-between h-full py-1">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
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
          </div>
        </motion.div>

        {/* Chatbot Section */}
        <div className="retro-card p-6">
          <h2 className="text-3xl font-bold text-emerald-700 mb-4 flex items-center text-shadow">
            <span className="pixelated-icon mr-2 text-emerald-500">
              smart_toy
            </span>
            EcoBot Chat
          </h2>
          <div
            className="bg-white border-2 border-emerald-300 rounded-lg p-4 h-64 overflow-y-auto mb-4"
            style={{ boxShadow: "inset 4px 4px 0px rgba(0,0,0,0.05)" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" ? (
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center mr-3 border-2 border-emerald-400">
                      <span className="pixelated-icon text-emerald-600">
                        smart_toy
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-emerald-800">EcoBot</p>
                      <div className="bg-emerald-100 p-3 rounded-lg mt-1 inline-block border border-emerald-200">
                        <p className="text-emerald-900">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-600 text-white p-3 rounded-lg inline-block border border-emerald-700">
                    <p>{msg.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Ask about sustainability or Echoverse..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow p-3 border-2 border-emerald-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              style={{ boxShadow: "inset 2px 2px 0px rgba(0,0,0,0.05)" }}
            />
            <button
              onClick={handleSend}
              className="retro-button px-6 py-3 rounded-l-none flex items-center justify-center"
            >
              <span className="font-bold">Send</span>
              <span className="material-icons ml-2">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEchoVerse;
