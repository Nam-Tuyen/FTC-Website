"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles, MessageSquare, HelpCircle, Zap } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const suggestedQuestions = [
  "Câu lạc bộ có những hoạt động gì?",
  "Làm thế nào để tham gia câu lạc bộ?",
  "DeFi là gì và tại sao nó quan trọng?",
  "Các ban trong câu lạc bộ làm gì?",
  "Có cơ hội thực tập nào không?",
  "Blockchain hoạt động như thế nào?",
  // Bổ sung thêm câu hỏi để tăng chiều dài khung
  "Thời gian sinh hoạt diễn ra vào khi nào?",
  "Chi phí tham gia là bao nhiêu?",
  "Cần kỹ năng gì để ứng tuyển?",
  "Có cần kinh nghiệm trước không?",
  "Câu lạc bộ có hỗ trợ dự án cá nhân không?",
  "Làm sao liên hệ Ban Chủ nhiệm?",
  "Các công cụ học tập được cung cấp là gì?",
  "Có chương trình mentoring không?",
]

const botResponses: { [key: string]: string } = {
  "câu lạc bộ có những hoạt động gì": `Câu lạc bộ Công nghệ Tài chính có nhiều hoạt động đa dạng:

🎯 **Workshop & Seminar**: Học về blockchain, AI trong tài chính, payment systems
📱 **Hackathon**: Thi phát triển ứng dụng fintech trong 48h
🤝 **Networking**: Gặp gỡ chuyên gia và doanh nghiệp fintech
💡 **Dự án thực tế**: Xây dựng ứng dụng cho đối tác
📚 **Khóa học**: Đào tạo kỹ năng chuyên sâu

Bạn có thể xem chi tiết tại trang Hoạt động!`,

  "làm thế nào để tham gia câu lạc bộ": `Để tham gia câu lạc bộ, bạn cần:

1️⃣ **Điền đơn ứng tuyển** tại trang Ứng tuyển
2️⃣ **Chọn ban** phù hợp: Kỹ thuật, Truyền thông, Sự kiện, Đối ngoại
3️⃣ **Phỏng vấn** với ban chủ nhiệm (15-20 phút)
4️⃣ **Tham gia** hoạt động định hướng

✅ **Yêu cầu**: Đam mê fintech, sẵn sàng học hỏi và đóng góp
📧 **Liên hệ**: president@fintechclub.vn nếu có thắc mắc`,

  "defi là gì": `**DeFi (Decentralized Finance)** là hệ thống tài chính phi tập trung:

🔗 **Định nghĩa**: Dịch vụ tài chính trên blockchain, không cần trung gian
💰 **Ứng dụng**: 
- Cho vay/vay (Compound, Aave)
- Giao dịch (Uniswap, SushiSwap)  
- Bảo hiểm (Nexus Mutual)
- Staking & Yield farming

⚡ **Ưu điểm**: Minh bạch, không kiểm duyệt, lãi suất cao
⚠️ **Rủi ro**: Smart contract bugs, impermanent loss, biến động cao

Câu lạc bộ có workshop về DeFi hàng tháng!`,

  "các ban trong câu lạc bộ": `Câu lạc bộ có 4 ban chính:

🔧 **Ban Kỹ thuật**
- Phát triển dự án blockchain, AI
- Nghiên cứu công nghệ mới
- Hướng dẫn kỹ thuật

📢 **Ban Truyền thông**  
- Quản lý social media
- Tạo nội dung marketing
- Thiết kế đồ h���a

🎉 **Ban Sự kiện**
- Tổ chức workshop, hackathon
- Quản lý logistics
- Liên hệ diễn giả

🤝 **Ban Đối ngoại**
- Tìm đối tác doanh nghiệp
- Xây dựng mối quan hệ
- Tìm cơ hội tài trợ

Bạn quan tâm ban nào?`,

  "blockchain hoạt động như thế nào": `**Blockchain** là chuỗi khối phân tán:

🔗 **Cấu trúc**: Các block liên kết bằng hash
📊 **Dữ liệu**: Mỗi block chứa transactions + timestamp
🔐 **Bảo mật**: Cryptographic hash + consensus mechanism

⚙️ **Quy trình**:
1. Transaction được tạo
2. Broadcast tới network  
3. Miners/Validators xác thực
4. Block mới được thêm vào chain
5. Transaction hoàn tất

💡 **Ứng dụng**: Cryptocurrency, smart contracts, supply chain, voting

Tham gia workshop Blockchain của chúng tôi để hiểu sâu hơn!`,

  default: `Xin chào! Tôi là AI Assistant của Câu lạc bộ Công nghệ Tài chính. 

Tôi có thể giúp bạn:
🤖 Trả lời câu hỏi về câu lạc bộ
💡 Giải thích các khái niệm fintech
📚 Hướng dẫn tham gia hoạt động
🔍 Tìm thông tin trên website

Hãy hỏi tôi bất cứ điều gì bạn muốn biết!`,
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: botResponses.default,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response
      }
    }

    // Fallback responses for common patterns
    if (lowerMessage.includes("xin chào") || lowerMessage.includes("hello")) {
      return "Xin chào! Tôi là AI Assistant của Câu lạc bộ Công nghệ Tài chính. Tôi có thể giúp gì cho bạn?"
    }

    if (lowerMessage.includes("cảm ơn")) {
      return "Rất vui được giúp đỡ bạn! Nếu có thêm câu hỏi nào khác, đừng ngần ngại hỏi nhé! 😊"
    }

    return `Tôi hiểu bạn đang hỏi về "${userMessage}". Hiện tại t��i chưa có thông tin chi tiết về vấn đề này. 

Bạn có thể:
📧 Liên hệ trực tiếp: president@fintechclub.vn
💬 Tham gia diễn đàn để thảo luận
📞 Gọi hotline: 0123-456-789

Hoặc thử hỏi về các chủ đ��� khác mà tôi có thể hỗ trợ!`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading font-black text-5xl sm:text-6xl text-foreground mb-6 text-glow">
            <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-pulse uppercase tracking-wide">AI CHATBOT</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            <em>Trợ lý AI thông minh giúp bạn tìm hiểu về câu lạc bộ và các kiến thức Fintech</em>
          </p>
        </div>
      </section>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-auto">
        <div className="min-w-[1200px] grid grid-cols-[1fr_minmax(720px,800px)_360px_1fr] grid-rows-[auto_auto] gap-8">
          {/* Chat Interface */}
          <div className="col-start-2 col-span-1 row-span-2">
            <Card className="h-full flex flex-col bg-card/20 backdrop-blur-sm border-accent/20 ring-1 ring-accent/10 hover:border-accent/40 transition-all duration-500 hover:glow">
              <CardHeader className="border-b border-accent/20">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/ai-chatbot-avatar.png" alt="AI Assistant" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">FinTech AI Assistant</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">Luôn sẵn sàng hỗ trợ bạn <span className="inline-flex items-center text-xs"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1"></span>Online</span></p>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%]`}>
                      {message.sender === "bot" && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 overflow-hidden break-words ${
                          message.sender === "user" ? "bg-primary text-primary-foreground glow" : "bg-secondary/20 text-foreground border border-accent/20"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {hasMounted ? message.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </p>
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
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="border-t border-accent/20 p-4 bg-card/10 backdrop-blur-sm">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim()} className="glow">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-start-3 col-span-1">
            {/* Suggested Questions */}
            <Card className="flex flex-col bg-card/20 backdrop-blur-sm border-accent/20 ring-1 ring-accent/10 hover:border-accent/40 transition-all duration-500 hover:glow">
              <CardHeader>
                <CardTitle className="text-lg font-heading flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Câu hỏi gợi ý
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 flex-1 overflow-y-auto">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 bg-transparent whitespace-normal break-words"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm break-words">{question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

          </div>

          <div className="col-start-3 col-span-1 row-start-2">
            <Card className="bg-card/20 backdrop-blur-sm border-accent/20 ring-1 ring-accent/10 hover:border-accent/40 transition-all duration-500 hover:glow">
              <CardHeader>
                <CardTitle className="text-lg font-heading flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Tính năng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">AI Thông minh</h4>
                    <p className="text-xs text-muted-foreground">Hiểu ngữ cảnh và trả lời chính xác</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Phản hồi nhanh</h4>
                    <p className="text-xs text-muted-foreground">Trả lời trong vài giây</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-chart-3/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Hỗ trợ 24/7</h4>
                    <p className="text-xs text-muted-foreground">Luôn sẵn sàng giúp đỡ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
