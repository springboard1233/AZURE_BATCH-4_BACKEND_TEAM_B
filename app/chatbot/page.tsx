"use client";

import { useState, useRef, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Azure Forecasting Assistant. Ask me anything about resource usage, predictions, regions, anomalies, or capacity planning!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll on update
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Call backend chatbot endpoint
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response || "I couldn't understand that, please try again!",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chatbot request error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Unable to reach chatbot backend. Make sure Flask is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="space-y-6">
      <DashboardHeader title="Chatbot Assistant" subtitle="Ask any question about forecasts or insights" />

      <Card className="bg-slate-900/50 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Azure AI Chatbot</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Chat Window */}
          <div
            ref={scrollRef}
            className="h-[480px] overflow-y-auto p-4 rounded-lg bg-slate-800/40 border border-slate-700 space-y-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Typing…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-3 mt-4">
            <Input
              placeholder="Ask something about Azure forecasting..."
              className="bg-slate-800 border-slate-700 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />

            <Button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
