import { NextRequest, NextResponse } from 'next/server'
import { createNotionQuestion } from '@/lib/notion'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { anonymous, studentId, name, title, content, category, questionId, authorId } = body || {}

    if (!anonymous) {
      if (!studentId || !/^K\d{9}$/.test(studentId)) return NextResponse.json({ error: 'MSSV không hợp lệ' }, { status: 400 })
    }
    if (!title || !content) return NextResponse.json({ error: 'Thiếu tiêu đề hoặc nội dung' }, { status: 400 })
    if (!category) return NextResponse.json({ error: 'Thiếu chủ đề' }, { status: 400 })

    const pageId = await createNotionQuestion({
      title,
      content,
      authorName: anonymous ? 'Ẩn danh' : name || 'Ẩn danh',
      authorId: authorId || 'unknown',
      studentId: anonymous ? '' : studentId,
      category,
    })

    return NextResponse.json({ ok: true, pageId, clientId: questionId || null })
  } catch (e: any) {
    console.error('Notion question API error:', e)
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}
