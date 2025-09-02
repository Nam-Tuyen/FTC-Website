import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function SuggestedQuestions({ questions, onPick }: { questions: string[]; onPick: (q: string) => void }) {
  return (
    <Card className="flex flex-col bg-card/20 backdrop-blur-sm border-accent/20 ring-1 ring-accent/10 hover:border-accent/40 transition-all duration-500 hover:glow">
      <CardHeader>
        <CardTitle className="text-lg font-heading flex items-center">Câu hỏi gợi ý</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 flex-1 overflow-y-auto">
        {questions.map((question, index) => (
          <Button key={index} variant="outline" className="w-full text-left justify-start h-auto p-3 bg-transparent whitespace-normal break-words" onClick={() => onPick(question)}>
            <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm break-words">{question}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
