"use client"

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Message Type
type Message = {
  role: "user" | "assistant" | "system";
  text: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [uploading, setUploading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMsg: Message = { role: "user", text: query };
    setMessages((m) => [...m, userMsg]);
    setQuery("");

    try {
      const resp = await axios.post("http://localhost:8000/chat", {
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
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    setUploading(true);

    const form = new FormData();
    for (const f of files) form.append("files", f);

    try {
      const resp = await axios.post("http://localhost:8000/upload-pdf", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessages((m) => [
        ...m,
        { role: "system", text: `Uploaded successfully.` },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "system", text: "Upload failed." }]);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Graph RAG Chatbot</h1>

      <div className="space-y-4 mb-6">
        {messages.map((m, i) => (
          <Card
            key={i}
            className={`p-4 ${
              m.role === "user"
                ? "bg-blue-100 text-right"
                : m.role === "assistant"
                ? "bg-gray-100 text-left"
                : "bg-yellow-100 text-center"
            }`}
          >
            <CardContent>
              <div className="text-xs text-gray-600 mb-1">{m.role}</div>
              <div>{m.text}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>

      <div className="mt-4">
        <Label className="mb-2 block">Upload PDFs to update knowledge base:</Label>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleUpload}
          disabled={uploading}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
    </div>
  );
}
