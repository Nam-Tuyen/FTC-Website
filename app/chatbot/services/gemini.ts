export async function chatWithGemini(prompt: string, history: { role: "user" | "model"; content: string }[]) {
  const res = await fetch("/api/chat/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, history }),
  })
  if (!res.ok) return ""
  const data = await res.json()
  return typeof data?.text === "string" ? data.text : ""
}
