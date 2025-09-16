import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function LearningHubCard({ chats }) {
  const [messages, setMessages] = useState(chats);
  const [input, setInput] = useState("");

  function sendMsg() {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        from: "you",
        text: input,
      },
    ]);
    setInput("");
  }

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
          <MessageCircle className="text-blue-500 mr-2 h-6 w-6" /> Learning Hub
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 flex flex-col space-y-4 pr-2 overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.from.includes("you") ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  m.from.includes("you")
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center relative">
          <Input
            className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 rounded-full py-2 pl-4 pr-12"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={sendMsg}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
