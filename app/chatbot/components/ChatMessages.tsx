import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { Bot, User } from "lucide-react"
import type { Message } from "../types"

export function ChatMessages({ messages, isTyping, endRef, hasMounted }: { messages: Message[]; isTyping: boolean; endRef: React.RefObject<HTMLDivElement>; hasMounted: boolean }) {
  return (
    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`flex items-start space-x-2 max-w-[80%]`}>
            {message.sender === "bot" && (
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div className={`rounded-2xl px-4 py-3 overflow-hidden break-words ${message.sender === "user" ? "bg-primary text-primary-foreground glow" : "bg-secondary/20 text-foreground border border-accent/20"}`}>
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">{hasMounted ? message.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : ""}</p>
            </div>
            {message.sender === "user" && (
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="flex items-start space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={endRef} />
    </CardContent>
  )
}
