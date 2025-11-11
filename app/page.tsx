"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Message Type
type Message = {
  role: "user" | "assistant" | "system";
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMsg: Message = { role: "user", text: query };
    setMessages((m) => [...m, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const resp = await axios.post("https://cbw-lead-capture-agent-b73dbd5e109e.herokuapp.com/chat", {
        query,
        history: messages,
      });

      setMessages((m) => [
        ...m,
        { role: "assistant", text: resp.data.answer },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Error — check server logs." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-6 w-80 h-[480px] bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden border"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center">
              <span>Chat Assistant</span>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <Card
                  key={i}
                  className={`p-2 text-sm ${
                    m.role === "user"
                      ? "bg-blue-100 self-end text-right"
                      : "bg-gray-100 self-start text-left"
                  }`}
                >
                  {m.text}
                </Card>
              ))}

              {loading && (
                <div className="flex items-center space-x-2">
                  <div className="dot bg-gray-400 animate-bounce" />
                  <div className="dot bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="dot bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} disabled={loading}>
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tailwind animation for typing dots */}
      <style jsx>{`
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        .animate-bounce {
          animation: bounce 1.4s infinite ease-in-out both;
        }
      `}</style>
    </>
  );
}
