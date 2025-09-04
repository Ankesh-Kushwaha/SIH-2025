import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import EnvScene from "./eco/EnvScene";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EcoAboutChatbot3D() {
  const [days, setDays] = useState(0);
  const [actions, setActions] = useState({
    treePlanting: 0,
    recycling: 0,
    pollution: 0,
  });
  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm EcoGuide — ask me how your actions affect the environment. Try: 'What happens if I plant 100 trees?'",
    },
  ]);
  const [input, setInput] = useState("");

  // --- health metric
  const health = useMemo(() => {
    const baseDecay = Math.max(0, 1 - days * 0.00045);
    const plantBoost = Math.min(1, actions.treePlanting * 0.01);
    const recycleBoost = Math.min(0.25, actions.recycling * 0.005);
    const pollutionHit = Math.min(1, actions.pollution * 0.02);
    const raw = baseDecay + plantBoost + recycleBoost - pollutionHit;
    return Math.max(0, Math.min(1, raw));
  }, [days, actions]);

  // --- actions
  function handleAction(type, delta = 1) {
    setActions((s) => ({ ...s, [type]: (s[type] || 0) + delta }));
    setChatMessages((m) => [
      ...m,
      {
        from: "bot",
        text: `Registered action: ${type} (+${delta}). This will affect future environment health.`,
      },
    ]);
  }

  // --- chatbot
  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setChatMessages((m) => [...m, userMsg]);

    const lower = input.toLowerCase();
    let reply = "Great question — here's a quick insight:\n";

    if (lower.includes("plant") || lower.includes("trees")) {
      reply +=
        "Planting trees increases air quality and carbon sequestration...";
    } else if (lower.includes("recycle")) {
      reply += "Recycling reduces landfill and raw material extraction...";
    } else if (lower.includes("pollute") || lower.includes("pollution")) {
      reply += "Pollution harms biodiversity, water, and human health...";
    } else {
      reply +=
        "I can explain how specific actions map to environmental metrics...";
    }

    setTimeout(
      () => setChatMessages((m) => [...m, { from: "bot", text: reply }]),
      400
    );
    setInput("");
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* About + snapshot */}
      {/* (same layout you had — keep as is, now it’s cleaner) */}

      {/* 3D Simulation */}
      <EnvScene health={health} />

      {/* Chatbot */}
      <Card className="p-4 flex flex-col">
        <CardHeader>
          <CardTitle>EcoGuide Chatbot</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-2 space-y-2 rounded-lg bg-slate-50">
            {chatMessages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] ${
                  m.from === "bot" ? "ml-0 bg-white" : "ml-auto bg-emerald-50"
                } p-3 rounded-lg shadow-sm`}
              >
                <div className="text-sm whitespace-pre-line">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask EcoGuide..."
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
