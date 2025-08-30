"use client"

import { useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import * as Popover from "@radix-ui/react-popover"
import { DayPicker } from "react-day-picker"
import { addMonths } from "date-fns"
import "react-day-picker/dist/style.css"

const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
  { value: "na", label: "Không muốn trả lời" },
]

const commuteOptions = [
  { value: "walk", label: "Đi bộ" },
  { value: "bike", label: "Xe đạp" },
  { value: "motorbike", label: "Xe máy" },
  { value: "bus", label: "Xe buýt" },
  { value: "other", label: "Khác" },
]

const interestAreas = [
  "\"Fintech\" nói chung",
  "Giao dịch thuật toán",
  "Dữ liệu & AI trong tài chính",
  "Blockchain/Web3",
  "Tài chính cá nhân số",
  "Truyền thông – thiết kế",
  "Tổ chức sự kiện",
]

const eventsInterested = [
  "ATTACKER",
  "Workshop/Talkshow",
  "Tham quan doanh nghiệp",
  "Ngày hội nghề nghiệp",
]

const skillsMulti = [
  "Viết Email",
  "Dẫn Chương Trình/MC",
  "Dự Trù Kinh Phí",
  "Sáng Tạo Nội Dung",
  "Viết Bài",
  "Thiết Kế Hình Ảnh",
  "Quay–Chụp",
  "Dựng Video",
  "Phân Tích Dữ Liệu (Excel/SQL/Python)",
  "Trực Fanpage",
  "Quản Lý Dự Án",
  "Nghiên Cứu Học Thuật",
]

const toolsUsed = [
  "Excel/Sheets",
  "PowerPoint/Canva",
  "Python/R",
  "SQL",
  "Power BI/Tableau",
  "Figma",
  "Premiere/CapCut",
  "GitHub",
  "Notion",
  "Trello",
]

const teams = [
  { value: "hoc-thuat", label: "Học thuật" },
  { value: "su-kien", label: "Sự kiện" },
  { value: "truyen-thong", label: "Truyền thông" },
  { value: "tai-chinh-ca-nhan", label: "Tài chính cá nhân" },
  { value: "nhan-su", label: "Nhân sự" },
]

function parseISODate(iso: string): Date | null {
  if (!iso) return null
  const parts = iso.split("-").map(Number)
  if (parts.length !== 3) return null
  const [y, m, d] = parts
  if (!y || !m || !d) return null
  const dt = new Date(y, m - 1, d)
  return isNaN(dt.getTime()) ? null : dt
}

function formatDisplayFromISO(iso: string): string {
  const d = parseISODate(iso)
  if (!d) return ""
  const dd = String(d.getDate()).padStart(2, "0")
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const yyyy = String(d.getFullYear())
  return `${dd}/${mm}/${yyyy}`
}

type FormState = {
  // 1) Thông tin cơ bản
  fullName: string
  dob: string
  gender: string
  studentId: string
  classFacultyCourse: string
  schoolEmail: string
  phone: string
  profileUrl: string
  currentResidence: string
  commute: string

  // 2) Vì sao bạn chọn FTC?
  whyFtc: string
  interestAreas: string[]
  interestedEvents: string[]

  // 3) Kỹ năng & siêu năng lực
  strengths: string
  skills: string[]
  tools: string[]
  portfolioUrl: string

  // 4) Trải nghiệm ho��t động
  clubExperience: string
  extroversion: string
  teamworkKey: string
  availability: string

  // 5) Ban mong muốn
  primaryTeam: string
  secondaryTeam: string

  // 6) Ban-specific
  hocThuat_topics: string
  hocThuat_training: string

  suKien_timeline: string

  truyenThong_links: string
  truyenThong_process: string

  tccn_topic: string
  tccn_messages: string

  nhanSu_conflict: string
  nhanSu_bonding: string
}

export default function ApplicationPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    dob: "",
    gender: "",
    studentId: "",
    classFacultyCourse: "",
    schoolEmail: "",
    phone: "",
    profileUrl: "",
    currentResidence: "",
    commute: "",

    whyFtc: "",
    interestAreas: [],
    interestedEvents: [],

    strengths: "",
    skills: [],
    tools: [],
    portfolioUrl: "",

    clubExperience: "",
    extroversion: "",
    teamworkKey: "",
    availability: "",

    primaryTeam: "",
    secondaryTeam: "",

    hocThuat_topics: "",
    hocThuat_training: "",

    suKien_timeline: "",

    truyenThong_links: "",
    truyenThong_process: "",

    tccn_topic: "",
    tccn_messages: "",

    nhanSu_conflict: "",
    nhanSu_bonding: "",
  })

  const update = (key: keyof FormState, value: any) => setForm((p) => ({ ...p, [key]: value }))
  const toggleInArray = (key: keyof FormState, value: string) =>
    setForm((p) => {
      const arr = new Set<string>((p[key] as string[]) || [])
      arr.has(value) ? arr.delete(value) : arr.add(value)
      return { ...p, [key]: Array.from(arr) }
    })

  const requiredValid = useMemo(() => {
    const emailOk = /@.+\.uel\.edu\.vn$/i.test(form.schoolEmail.trim())
    return (
      form.fullName.trim() !== "" &&
      form.dob.trim() !== "" &&
      form.studentId.trim() !== "" &&
      form.classFacultyCourse.trim() !== "" &&
      emailOk &&
      form.phone.trim() !== "" &&
      form.whyFtc.trim() !== "" &&
      form.strengths.trim() !== "" &&
      form.primaryTeam.trim() !== ""
    )
  }, [form])

  const selectedDob = useMemo(() => parseISODate(form.dob), [form.dob])
  const [openDOB, setOpenDOB] = useState(false)
  const [calMonth, setCalMonth] = useState<Date>(selectedDob || new Date())
  const onCalendarWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const step = e.deltaY > 0 ? 1 : -1
    setCalMonth((m) => addMonths(m, step))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!requiredValid) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc (*) và kiểm tra email trường (@…uel.edu.vn)")
      return
    }
    console.log("FTC Application Submitted", form)
    alert("Đã gửi! Tụi mình sẽ liên hệ lịch phỏng vấn sớm nhé 💚")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-6">
            ĐƠN ĐĂNG KÝ THAM GIA FTC
          </h1>
          <p className="text-2xl text-muted-foreground text-pretty italic">
            <em>Các bạn cứ trả lời thoải mái nhé!</em>
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center font-heading">Mẫu đơn ứng tuyển</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-10">
              {/* 1) Thông tin cơ bản */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold">1) Thông tin cơ bản</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Ngày sinh (dd/mm/yyyy) *</Label>
                    <Popover.Root open={openDOB} onOpenChange={(v) => { setOpenDOB(v); if (v && selectedDob) setCalMonth(selectedDob) }}>
                      <Popover.Trigger asChild>
                        <div>
                          <Input
                            id="dob"
                            value={form.dob ? formatDisplayFromISO(form.dob) : ""}
                            onClick={() => setOpenDOB(true)}
                            readOnly
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                      </Popover.Trigger>
                      <Popover.Content className="rounded-md border bg-popover p-1 shadow-md" sideOffset={6} align="start">
                        <div onWheel={onCalendarWheel} className="select-none">
                          <DayPicker
                            mode="single"
                            month={calMonth}
                            onMonthChange={setCalMonth}
                            selected={selectedDob || undefined}
                            onSelect={(d) => {
                              if (!d) return
                              const iso = d.toISOString().slice(0, 10)
                              update("dob", iso)
                              setOpenDOB(false)
                            }}
                            captionLayout="dropdown"
                            fromYear={1980}
                            toYear={new Date().getFullYear()}
                            numberOfMonths={1}
                            showOutsideDays
                            styles={{
                              // Base
                              root: { fontSize: "12px", color: "#fff" },
                              months: { color: "#fff" },
                              table: { color: "#fff" },
                              head: { color: "#fff" },
                              // Header / caption
                              caption: { color: "#fff" },
                              caption_label: { fontSize: "12px", color: "#fff" },
                              caption_dropdowns: { color: "#fff", display: "flex", gap: 6 },
                              caption_dropdown: { color: "#fff", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 6, padding: "2px 6px" },
                              caption_dropdown_month: { color: "#fff" },
                              caption_dropdown_year: { color: "#fff" },
                              // Week header
                              head_cell: { fontSize: "11px", padding: "4px 6px", color: "#fff" },
                              // Days
                              day: { width: 28, height: 28, margin: 2, padding: 0, lineHeight: "28px", color: "#fff", borderRadius: 6 },
                              day_selected: { backgroundColor: "rgba(255,255,255,0.22)", color: "#fff" },
                              day_today: { outline: "1px solid rgba(255,255,255,0.45)", borderRadius: 6 },
                              day_outside: { color: "rgba(255,255,255,0.55)" },
                              // Navigation
                              nav: { color: "#fff" },
                              nav_button: { width: 28, height: 28, color: "#fff" },
                              nav_button_previous: { color: "#fff" },
                              nav_button_next: { color: "#fff" },
                            }}
                          />
                        </div>
                      </Popover.Content>
                      <style jsx global>{`
                        /* Force white globally inside DayPicker root */
                        .rdp-root,
                        .rdp-root * {
                          color: #fff !important;
                        }
                        .rdp-root svg,
                        .rdp-root svg * {
                          fill: #fff !important;
                          stroke: #fff !important;
                        }
                        /* Specific elements for safety */
                        .rdp-root .rdp-caption,
                        .rdp-root .rdp-caption_label,
                        .rdp-root .rdp-caption_dropdowns,
                        .rdp-root .rdp-head_cell,
                        .rdp-root .rdp-day,
                        .rdp-root .rdp-day_button,
                        .rdp-root .rdp-nav,
                        .rdp-root .rdp-nav button,
                        .rdp-root .rdp-nav button svg {
                          color: #fff !important;
                        }
                        .rdp-root .rdp-caption_dropdowns select,
                        .rdp-root .rdp-caption_dropdowns option {
                          color: #fff !important;
                          background: transparent;
                          caret-color: #fff;
                        }
                      `}</style>
                    </Popover.Root>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Giới tính</Label>
                    <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">MSSV *</Label>
                    <Input id="studentId" value={form.studentId} onChange={(e) => update("studentId", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="classFacultyCourse">Lớp*</Label>
                    <Input id="classFacultyCourse" value={form.classFacultyCourse} onChange={(e) => update("classFacultyCourse", e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolEmail">Email trường (@…uel.edu.vn) *</Label>
                    <Input id="schoolEmail" type="email" value={form.schoolEmail} onChange={(e) => update("schoolEmail", e.target.value)} placeholder="mssv@st.uel.edu.vn" aria-invalid={form.schoolEmail !== "" && !/@.+\.uel\.edu\.vn$/i.test(form.schoolEmail)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0xxxxxxxxx" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileUrl">Link Facebook/LinkedIn</Label>
                    <Input id="profileUrl" type="url" value={form.profileUrl} onChange={(e) => update("profileUrl", e.target.value)} placeholder="https://facebook.com/... hoặc LinkedIn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentResidence">Nơi ở hiện tại</Label>
                    <Input id="currentResidence" value={form.currentResidence} onChange={(e) => update("currentResidence", e.target.value)} placeholder="Địa chỉ thường trú" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phương tiện di chuyển</Label>
                  <RadioGroup value={form.commute} onValueChange={(v) => update("commute", v)} className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {commuteOptions.map((o) => (
                      <label key={o.value} className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem id={`commute-${o.value}`} value={o.value} />
                        <span className="text-sm">{o.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </section>

              {/* 2) Vì sao bạn ch���n FTC? */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold">2) Vì sao bạn chọn FTC?</h2>
                <div className="space-y-2">
                  <Label htmlFor="whyFtc">Điều gì khiến bạn muốn vào FTC? Bạn mong chờ gì trong 6 tháng tới? *</Label>
                  <Textarea id="whyFtc" rows={5} value={form.whyFtc} onChange={(e) => update("whyFtc", e.target.value)} placeholder="Chia sẻ kỳ vọng và lý do của bạn..." />
                </div>
                <div className="space-y-2">
                  <Label>Bạn hứng thú mảng nào? (có thể chọn nhiều đáp án)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {interestAreas.map((area) => (
                      <label key={area} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={form.interestAreas.includes(area)} onCheckedChange={() => toggleInArray("interestAreas", area)} />
                        <span className="text-sm">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Sự kiện bạn muốn tham gia tổ chức (có thể chọn nhiều đáp án)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {eventsInterested.map((ev) => (
                      <label key={ev} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={form.interestedEvents.includes(ev)} onCheckedChange={() => toggleInArray("interestedEvents", ev)} />
                        <span className="text-sm">{ev}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* 3) Kỹ năng & “siêu năng lực” */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold">3) Kỹ năng & “siêu năng lực” của bạn</h2>
                <div className="space-y-2">
                  <Label htmlFor="strengths">Điểm mạnh của bạn là gì? Bạn muốn cải thiện điều gì? *</Label>
                  <Textarea id="strengths" rows={5} value={form.strengths} onChange={(e) => update("strengths", e.target.value)} placeholder="Chia sẻ thật lòng nhé!" />
                </div>
                <div className="space-y-2">
                  <Label>Bạn làm tốt những việc nào? (có thể chọn nhiều đáp án)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skillsMulti.map((s) => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={form.skills.includes(s)} onCheckedChange={() => toggleInArray("skills", s)} />
                        <span className="text-sm">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bạn đã dùng công cụ nào? (có thể chọn nhiều đáp án)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {toolsUsed.map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={form.tools.includes(t)} onCheckedChange={() => toggleInArray("tools", t)} />
                        <span className="text-sm">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Link sản phẩm/portfolio (nếu có)</Label>
                  <Input id="portfolioUrl" type="url" value={form.portfolioUrl} onChange={(e) => update("portfolioUrl", e.target.value)} placeholder="https://..." />
                </div>
              </section>

              {/* 4) Trải nghiệm hoạt động */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold">4) Trải nghiệm hoạt động</h2>
                <div className="space-y-2">
                  <Label htmlFor="clubExperience">Bạn từng tham gia CLB/đội nhóm nào chưa? Kể 1 trải nghiệm vui hoặc đáng nhớ nhé!</Label>
                  <Textarea id="clubExperience" rows={5} value={form.clubExperience} onChange={(e) => update("clubExperience", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Bạn thấy mình hướng ngoại tới mức nào? (1–5)</Label>
                  <RadioGroup value={form.extroversion} onValueChange={(v) => update("extroversion", v)} className="flex items-center gap-4">
                    {["1","2","3","4","5"].map((n) => (
                      <label key={n} className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem id={`ext-${n}`} value={n} />
                        <span>{n}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Theo bạn, điều gì quyết định làm việc nhóm hiệu quả?</Label>
                  <RadioGroup value={form.teamworkKey} onValueChange={(v) => update("teamworkKey", v)} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Kỷ luật","Giao tiếp","Cam kết","Tôn trọng","Trách nhiệm","Tập trung kết quả"].map((k) => (
                      <label key={k} className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem id={`tw-${k}`} value={k} />
                        <span className="text-sm">{k}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Thời gian bạn có thể tham gia (giờ/tuần, khung giờ rảnh)</Label>
                  <Textarea id="availability" rows={4} value={form.availability} onChange={(e) => update("availability", e.target.value)} placeholder="Ví dụ: 6–8 giờ/tuần, tối T2–T5" />
                </div>
              </section>

              {/* 5) Bạn mu��n vào ban nào? */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold">5) Bạn muốn vào ban nào?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ban chính muốn ứng tuyển *</Label>
                    <Select value={form.primaryTeam} onValueChange={(v) => update("primaryTeam", v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn 1 ban" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ban phụ (nếu muốn thử thêm)</Label>
                    <Select value={form.secondaryTeam} onValueChange={(v) => update("secondaryTeam", v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn 1 ban (không bắt buộc)" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              {/* 6) Câu hỏi bổ sung theo ban */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold">6) Câu hỏi bổ sung theo ban</h2>
                {form.primaryTeam === "hoc-thuat" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hocThuat_topics">Nêu 2–3 chủ đề bạn muốn xây nội dung trong học kỳ này</Label>
                      <Textarea id="hocThuat_topics" rows={4} value={form.hocThuat_topics} onChange={(e) => update("hocThuat_topics", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hocThuat_training"><p>Phác thảo 1 buổi training (mục tiêu → nội dung chính → “đem về” cho người học)</p></Label>
                      <Textarea id="hocThuat_training" rows={5} value={form.hocThuat_training} onChange={(e) => update("hocThuat_training", e.target.value)} />
                    </div>
                  </div>
                )}
                {form.primaryTeam === "su-kien" && (
                  <div className="space-y-2">
                    <Label htmlFor="suKien_timeline">Lập timeline ngắn cho 1 workshop 100 người (các mốc chính và đầu việc quan trọng)</Label>
                    <Textarea id="suKien_timeline" rows={5} value={form.suKien_timeline} onChange={(e) => update("suKien_timeline", e.target.value)} />
                  </div>
                )}
                {form.primaryTeam === "truyen-thong" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="truyenThong_links">Gửi 1–2 sản phẩm bạn từng làm hoặc link bài viết</Label>
                      <Input id="truyenThong_links" value={form.truyenThong_links} onChange={(e) => update("truyenThong_links", e.target.value)} placeholder="URL cách nhau bởi dấu phẩy" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="truyenThong_process">Mô tả nhanh quy trình làm 1 bài đăng chuẩn</Label>
                      <Textarea id="truyenThong_process" rows={5} value={form.truyenThong_process} onChange={(e) => update("truyenThong_process", e.target.value)} />
                    </div>
                  </div>
                )}
                {form.primaryTeam === "tai-chinh-ca-nhan" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tccn_topic">Đề xuất chủ đề workshop “quản lý tiền cho sinh viên”</Label>
                      <Input id="tccn_topic" value={form.tccn_topic} onChange={(e) => update("tccn_topic", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tccn_messages">3 thông điệp cốt lõi</Label>
                      <Textarea id="tccn_messages" rows={4} value={form.tccn_messages} onChange={(e) => update("tccn_messages", e.target.value)} />
                    </div>
                  </div>
                )}
                {form.primaryTeam === "nhan-su" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nhanSu_conflict">Bạn sẽ xử lý thế nào khi đội 6–8 ngư���i có xung đột?</Label>
                      <Textarea id="nhanSu_conflict" rows={5} value={form.nhanSu_conflict} onChange={(e) => update("nhanSu_conflict", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nhanSu_bonding">Gợi ý 1 hoạt động gắn kết đơn giản mà vui</Label>
                      <Textarea id="nhanSu_bonding" rows={4} value={form.nhanSu_bonding} onChange={(e) => update("nhanSu_bonding", e.target.value)} />
                    </div>
                  </div>
                )}
              </section>

              <div className="flex justify-between pt-2">
                <Button type="button" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Lên đầu trang
                </Button>
                <Button type="submit" disabled={!requiredValid} className="bg-primary hover:bg-primary/90">
                  Gửi đơn
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Trải nghiệm vui</h3>
              <p className="text-muted-foreground text-sm">Gắn kết, học hỏi, và làm dự án thực tế cùng team</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Cơ hội phát triển</h3>
              <p className="text-muted-foreground text-sm">Workshop, talkshow, mentoring từ anh chị đi trước</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Kết nối ngành</h3>
              <p className="text-muted-foreground text-sm">Tiếp cận doanh nghiệp và cơ hội thực tập trong lĩnh vực</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
