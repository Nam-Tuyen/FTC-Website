'use client'

import { useEffect, useMemo, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, Search, Plus, HelpCircle, Heart, Reply } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type ReplyItem = {
  id: string
  authorId: string
  authorName: string
  content: string
  createdAt: number
}

type QuestionItem = {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  studentId: string
  category: string
  createdAt: number
  likes: string[]
  replies: ReplyItem[]
}

const STORAGE_KEYS = {
  userId: 'forum.currentUserId',
  userName: 'forum.currentUserName',
  questions: 'forum.questions',
}

const CATEGORIES = [
  'Hỏi đáp về câu lạc bộ',
  'Hỏi đáp thông tin về ngành học',
  'Thảo luận',
]

function uuid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function formatTime(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 60) return `${diff}s trước`
  if (diff < 3600) return `${Math.floor(diff / 60)}m trước`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h trư��c`
  return new Date(ts).toLocaleString()
}

export default function ForumPage() {
  const [currentUserId, setCurrentUserId] = useState<string>('')
  const [currentUserName, setCurrentUserName] = useState<string>('Nam Tuyen Le')
  const [questions, setQuestions] = useState<QuestionItem[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  useEffect(() => {
    const id = localStorage.getItem(STORAGE_KEYS.userId) || uuid()
    const name = localStorage.getItem(STORAGE_KEYS.userName) || 'Nam Tuyen Le'
    setCurrentUserId(id)
    setCurrentUserName(name)
    localStorage.setItem(STORAGE_KEYS.userId, id)
    localStorage.setItem(STORAGE_KEYS.userName, name)

    const saved = localStorage.getItem(STORAGE_KEYS.questions)
    if (saved) {
      try {
        setQuestions(JSON.parse(saved))
      } catch {
        setQuestions([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.questions, JSON.stringify(questions))
  }, [questions])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = q
      ? questions.filter((item) =>
          [item.title, item.content, item.authorName, item.studentId, item.category].some((f) =>
            f.toLowerCase().includes(q)
          )
        )
      : questions
    return [...list].sort((a, b) => {
      if (b.likes.length !== a.likes.length) return b.likes.length - a.likes.length
      return b.createdAt - a.createdAt
    })
  }, [questions, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPageClamped = Math.min(Math.max(1, currentPage), totalPages)
  const pageItems = useMemo(() => {
    const start = (currentPageClamped - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPageClamped])

  async function handleCreateQuestion(data: {
    title: string
    content: string
    studentId: string
    category: string
    anonymous?: boolean
  }) {
    const newId = uuid()
    const isAnon = !!data.anonymous
    const newQ: QuestionItem = {
      id: newId,
      title: data.title,
      content: data.content,
      authorId: currentUserId,
      authorName: isAnon ? 'Ẩn danh' : currentUserName || 'Ẩn danh',
      studentId: isAnon ? 'Ẩn danh' : data.studentId,
      category: data.category,
      createdAt: Date.now(),
      likes: [],
      replies: [],
    }

    setQuestions((prev) => [newQ, ...prev])

    try {
      await Promise.allSettled([
        fetch('/api/forum/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            anonymous: isAnon,
            studentId: isAnon ? '' : data.studentId,
            name: isAnon ? 'Ẩn danh' : currentUserName || '',
            title: data.title,
            content: data.content,
            category: data.category,
            questionId: newId,
          }),
        }),
        fetch('/api/forum/notion/question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            anonymous: isAnon,
            studentId: isAnon ? '' : data.studentId,
            name: isAnon ? 'Ẩn danh' : currentUserName || '',
            title: data.title,
            content: data.content,
            category: data.category,
            questionId: newId,
            authorId: currentUserId,
          }),
        }),
      ])
    } catch (e) {}
  }

  function handleToggleLike(qid: string) {
    if (!currentUserId) return
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qid) return q
        const has = q.likes.includes(currentUserId)
        return { ...q, likes: has ? q.likes.filter((x) => x !== currentUserId) : [...q.likes, currentUserId] }
      })
    )
  }

  function handleAddReply(
    qid: string,
    content: string,
    opts?: { anonymous?: boolean; studentId?: string }
  ) {
    if (!content.trim()) return
    const isAnon = !!opts?.anonymous
    const reply: ReplyItem = {
      id: uuid(),
      authorId: currentUserId,
      authorName: isAnon ? 'Ẩn danh' : opts?.studentId ? `MSSV: ${opts.studentId}` : currentUserName || 'Ẩn danh',
      content,
      createdAt: Date.now(),
    }
    setQuestions((prev) => prev.map((q) => (q.id === qid ? { ...q, replies: [...q.replies, reply] } : q)))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-6">
              Diễn đàn <span className="text-primary">Thảo luận</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Nơi cộng đồng fintech chia sẻ kiến thức, thảo luận xu hướng và kết nối với nhau
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm câu hỏi, nội dung..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <AskQuestionCard
              currentUserName={currentUserName}
              onUpdateName={(name) => {
                setCurrentUserName(name)
                localStorage.setItem(STORAGE_KEYS.userName, name)
              }}
              onSubmit={handleCreateQuestion}
            />

            <section>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Câu hỏi gần đây</h2>
              <div className="space-y-4">
                {pageItems.map((q) => (
                  <QuestionCard
                    key={q.id}
                    q={q}
                    onLike={() => handleToggleLike(q.id)}
                    onReply={(content, opts) => handleAddReply(q.id, content, opts)}
                  />
                ))}
                {filtered.length === 0 && (
                  <Card>
                    <CardContent className="p-6 text-sm text-muted-foreground">Không có kết quả phù hợp.</CardContent>
                  </Card>
                )}
              </div>
            </section>

            {filtered.length > PAGE_SIZE && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPageClamped === 1}
                >
                  Trước
                </Button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const page = idx + 1
                  const active = page === currentPageClamped
                  return (
                    <Button
                      key={page}
                      variant={active ? "default" : "outline"}
                      className={active ? "" : "bg-transparent"}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPageClamped === totalPages}
                >
                  Sau
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-heading">Hồ sơ của bạn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">Tên hiển thị</div>
                <Input
                  value={currentUserName}
                  onChange={(e) => {
                    setCurrentUserName(e.target.value)
                    localStorage.setItem(STORAGE_KEYS.userName, e.target.value)
                  }}
                  placeholder="Nhập tên của bạn"
                />
                <div className="text-xs text-muted-foreground">Tên này sẽ dùng để đăng câu hỏi và phản hồi.</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-heading">Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => {
                    const el = document.getElementById('ask-question-form')
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Đặt câu hỏi
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Lên đầu trang
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function AskQuestionCard({
  currentUserName,
  onUpdateName,
  onSubmit,
}: {
  currentUserName: string
  onUpdateName: (name: string) => void
  onSubmit: (data: { title: string; content: string; studentId: string; category: string; anonymous?: boolean }) => void
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [studentId, setStudentId] = useState('')
  const [category, setCategory] = useState<string>(CATEGORIES[0])
  const [error, setError] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  function validate() {
    if (!anonymous) {
      if (!/^K\d{9}$/.test(studentId.trim())) {
        setError('MSSV phải có dạng K#########')
        return false
      }
    }
    if (!title.trim() || !content.trim()) {
      setError('Vui lòng nhập đầy đủ tiêu đề và nội dung')
      return false
    }
    setError('')
    return true
  }

  return (
    <Card id="ask-question-form">
      <CardHeader>
        <CardTitle className="text-lg font-heading">Đặt câu hỏi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-1">
            <label className="text-sm text-muted-foreground">Tên của bạn</label>
            <Input value={currentUserName} onChange={(e) => onUpdateName(e.target.value)} placeholder="Tên hiển thị" />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-muted-foreground">Mã số sinh viên</label>
            <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="K224141650" disabled={anonymous} />
          </div>
          <div className="md:col-span-1 flex items-end">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="accent-accent" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
              Đăng ẩn danh
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground">Tiêu đề</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề câu hỏi" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <label className="text-sm text-muted-foreground">Nội dung</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Mô tả chi tiết vấn đề, bối cảnh, bạn đã thử gì..."
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-muted-foreground">Chủ đề</label>
            <div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn chủ đề" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (!validate()) return
              onSubmit({ title: title.trim(), content: content.trim(), studentId: studentId.trim(), category, anonymous })
              setTitle('')
              setContent('')
              setStudentId('')
              setCategory(CATEGORIES[0])
              setAnonymous(false)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Đăng câu hỏi
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function QuestionCard({
  q,
  onLike,
  onReply,
}: {
  q: QuestionItem
  onLike: () => void
  onReply: (content: string, opts?: { anonymous?: boolean; studentId?: string }) => void
}) {
  const [reply, setReply] = useState('')
  const [replyAnonymous, setReplyAnonymous] = useState(false)
  const [replyStudentId, setReplyStudentId] = useState('')

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={'/placeholder.svg'} alt={q.authorName} />
            <AvatarFallback>{q.authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-heading font-semibold text-lg">{q.title}</h3>
              <Badge variant="outline" className="text-xs">{q.category}</Badge>
              <span className="text-xs text-muted-foreground">{formatTime(q.createdAt)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2 whitespace-pre-wrap">{q.content}</p>
            <div className="text-xs text-muted-foreground mb-3">{q.studentId ? `MSSV: ${q.studentId}` : 'Ẩn danh'}</div>

            <div className="flex items-center gap-3 text-sm">
              <button
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                onClick={onLike}
                aria-label="Thích câu hỏi"
              >
                <Heart className={`h-4 w-4 ${q.likes.length ? 'fill-primary text-primary' : ''}`} /> {q.likes.length}
              </button>
              <div className="inline-flex items-center gap-1 text-muted-foreground">
                <Reply className="h-4 w-4" /> {q.replies.length}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {q.replies.map((r) => (
                <div key={r.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium">{r.authorName}</div>
                    <div className="text-xs text-muted-foreground">{formatTime(r.createdAt)}</div>
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap">{r.content}</div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="md:col-span-3">
                  <Textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Viết phản hồi của bạn"
                  />
                </div>
                <div className="md:col-span-1">
                  <Input
                    value={replyStudentId}
                    onChange={(e) => setReplyStudentId(e.target.value)}
                    placeholder="MSSV (tùy chọn)"
                    disabled={replyAnonymous}
                  />
                  <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      className="accent-accent"
                      checked={replyAnonymous}
                      onChange={(e) => setReplyAnonymous(e.target.checked)}
                    />
                    Ẩn danh
                  </label>
                </div>
                <div className="md:col-span-1 flex md:block">
                  <Button
                    className="md:w-full ml-auto"
                    onClick={() => {
                      const c = reply.trim()
                      if (!c) return
                      if (!replyAnonymous && replyStudentId && !/^K\d{9}$/.test(replyStudentId.trim())) {
                        return
                      }
                      onReply(c, { anonymous: replyAnonymous, studentId: replyStudentId.trim() || undefined })
                      setReply('')
                      setReplyStudentId('')
                      setReplyAnonymous(false)
                    }}
                  >
                    Gửi phản hồi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
