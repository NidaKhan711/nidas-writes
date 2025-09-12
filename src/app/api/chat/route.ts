import OpenAI from "openai";
import { nidasData } from "@/data/data";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.GOOGLE_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Temporary in-memory storage for chat history (har server restart pe reset ho jayega)
const chatHistory: { role: "system" | "user" | "assistant"; content: string }[] = [
  { role: "system", content: nidasData },
];

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // New user message add karna
    chatHistory.push({ role: "user", content: message });

    // Send full history
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: chatHistory,
    });

    const aiReply = response.choices[0].message.content || "";

    // AI ka jawab bhi history me store karo
    chatHistory.push({ role: "assistant", content: aiReply });

    return NextResponse.json({ response: aiReply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { response: "Error fetching response from AI" },
      { status: 500 }
    );
  }
}