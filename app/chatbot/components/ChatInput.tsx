import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function ChatInput({ value, onChange, onSend, onKeyPress }: { value: string; onChange: (v: string) => void; onSend: () => void; onKeyPress: (e: React.KeyboardEvent) => void }) {
  return (
    <div className="border-t border-accent/20 p-4 bg-card/10 backdrop-blur-sm">
      <div className="flex space-x-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} onKeyPress={onKeyPress} placeholder="Nhập câu hỏi của bạn..." className="flex-1" />
        <Button onClick={onSend} disabled={!value.trim()} className="glow">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
