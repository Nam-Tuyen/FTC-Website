import { appendForumQuestion, getOrCreateSpreadsheetInFolder } from '@/lib/google-sheets'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ALLOWED_CATEGORIES = [
  'Hỏi đáp về câu lạc bộ',
  'Hỏi đáp thông tin về ngành học',
  'Thảo luận',
]

function formatDateSheetTitle(d = new Date()) {
  const y = d.getFullYear()
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${day}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { anonymous, studentId, name, title, content, category, questionId } = body || {}

    if (!anonymous) {
      if (!studentId || !/^K\d{9}$/.test(studentId)) {
        return NextResponse.json({ error: 'MSSV không hợp lệ (định dạng K#########)' }, { status: 400 })
      }
    }
    if (!title || !content) {
      return NextResponse.json({ error: 'Thiếu tiêu đề hoặc nội dung' }, { status: 400 })
    }
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Chủ đề không hợp lệ' }, { status: 400 })
    }

    let spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
      if (!folderId) {
        return NextResponse.json({ error: 'Thiếu GOOGLE_SHEET_ID hoặc GOOGLE_DRIVE_FOLDER_ID' }, { status: 500 })
      }
      spreadsheetId = await getOrCreateSpreadsheetInFolder(folderId, 'FTC Forum Questions')
    }

    const sheetTitle = formatDateSheetTitle()
    const timestamp = new Date().toISOString()

    await appendForumQuestion({
      spreadsheetId,
      sheetTitle,
      timestamp,
      studentId,
      name: name || '',
      title,
      content,
      category,
      questionId: questionId || '',
    })

    return NextResponse.json({ ok: true, sheetTitle, spreadsheetId })
  } catch (err: any) {
    console.error('Sheets API error:', err)
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 })
  }
}
