"use client"

import { usePathname } from "next/navigation"
import { FloatingChatbot } from "./floating-chatbot"

export function FloatingChatbotGate() {
  const pathname = usePathname()
  if (!pathname) return null
  if (pathname.startsWith("/chatbot")) return null
  return <FloatingChatbot />
}
