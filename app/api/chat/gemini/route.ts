import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

function buildContents(prompt: string, history?: { role: "user" | "model"; content: string }[]) {
  const contents: any[] = []
  if (history && Array.isArray(history)) {
    for (const m of history) {
      contents.push({ role: m.role === "model" ? "model" : "user", parts: [{ text: m.content.slice(0, 8000) }] })
    }
  }
  contents.push({ role: "user", parts: [{ text: prompt.slice(0, 8000) }] })
  return contents
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Thiếu GEMINI_API_KEY" }, { status: 500 })
    }

    const body = await req.json()
    const { prompt, history } = body || {}
    const cleanPrompt = typeof prompt === "string" ? prompt.trim() : ""
    if (!cleanPrompt) return NextResponse.json({ error: "Thiếu prompt" }, { status: 400 })

    const systemPreamble =
      "Bạn là trợ lý AI của Câu lạc bộ Công nghệ Tài chính (FTC). Trả lời ngắn gọn, rõ ràng, bằng tiếng Việt, hữu ích với sinh viên."

    const contents = [
      { role: "user", parts: [{ text: systemPreamble }] },
      ...buildContents(cleanPrompt, history),
    ]

    const res = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents })
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: `Gemini error: ${text}` }, { status: 500 })
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi chưa có câu trả lời phù hợp."
    return NextResponse.json({ text })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 })
  }
}
