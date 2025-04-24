import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    console.log(content);
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Summarize the following text: ${content}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const summary = chatCompletion.choices[0]?.message?.content || "";
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("[SUMMARIZE_ERROR]", error);
    return NextResponse.json({ error: "Failed to summarize" }, { status: 500 });
  }
}
