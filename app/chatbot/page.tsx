"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Bot, Sparkles, MessageSquare, HelpCircle, Zap } from "lucide-react"
import { ChatHeader } from "./components/ChatHeader"
import { ChatMessages } from "./components/ChatMessages"
import { ChatInput } from "./components/ChatInput"
import { SuggestedQuestions } from "./components/SuggestedQuestions"
import type { Message } from "./types"
import { chatWithGemini } from "./services/gemini"


const suggestedQuestions = [
  "Câu lạc bộ có những hoạt ��ộng gì?",
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

    if (lowerMessage.includes("c��m ơn")) {
      return "Rất vui được giúp đỡ bạn! Nếu có thêm câu h���i nào khác, đừng ngần ngại hỏi nhé! 😊"
    }

    return `Tôi hiểu bạn đang hỏi về "${userMessage}". Hiện tại t��i chưa có thông tin chi tiết về vấn đề này. 

Bạn có thể:
📧 Liên hệ trực tiếp: president@fintechclub.vn
💬 Tham gia diễn đàn để thảo luận
📞 Gọi hotline: 0123-456-789

Hoặc thử hỏi về các chủ đề khác mà tôi có thể hỗ trợ!`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    const prompt = inputValue
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const history = messages.map((m) => ({ role: m.sender === "bot" ? "model" : "user", content: m.content }))
      let text = await chatWithGemini(prompt, history)
      if (!text) text = getBotResponse(prompt)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: text,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (e) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Xin lỗi, hiện không thể kết nối tới AI. Vui lòng thử lại sau.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
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
      <ChatHeader />

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
              <ChatMessages messages={messages} isTyping={isTyping} endRef={messagesEndRef} hasMounted={hasMounted} />

              {/* Input */}
              <ChatInput value={inputValue} onChange={setInputValue} onSend={handleSendMessage} onKeyPress={handleKeyPress} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-start-3 col-span-1">
            <SuggestedQuestions questions={suggestedQuestions} onPick={handleSuggestedQuestion} />
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
