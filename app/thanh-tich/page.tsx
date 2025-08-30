import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Award, Users, Calendar, Star, Target, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

const achievements = [
  {
    id: 1,
    title: "Giải Nhất Hackathon FinTech 2024",
    description:
      "Đội thi của câu lạc bộ đã giành giải nhất cuộc thi Hackathon FinTech quốc gia với ứng dụng thanh toán di động sáng tạo.",
    date: "Tháng 3, 2024",
    category: "Cuộc thi",
    icon: Trophy,
    image: "/fintech-hackathon-trophy-award-ceremony.png",
    tags: ["Hackathon", "Giải nhất", "Thanh toán"],
  },
  {
    id: 2,
    title: "Chứng nhận Đối tác Chiến lược",
    description:
      "Được công nhận là đối tác chiến lược bởi Hiệp hội FinTech Việt Nam trong việc phát triển nhân lực công nghệ tài chính.",
    date: "Tháng 1, 2024",
    category: "Chứng nhận",
    icon: Award,
    image: "/partnership-certificate-fintech-vietnam.png",
    tags: ["Đối tác", "Chứng nhận", "Hiệp hội"],
  },
  {
    id: 3,
    title: "100+ Thành viên Tích cực",
    description:
      "Câu lạc bộ đã phát triển thành cộng đồng với hơn 100 thành viên tích cực từ các trường đại học và doanh nghiệp.",
    date: "Tháng 12, 2023",
    category: "Cộng đồng",
    icon: Users,
    image: "/large-group-fintech-community-meeting.png",
    tags: ["Thành viên", "Cộng đồng", "Phát triển"],
  },
  {
    id: 4,
    title: "Dự án Blockchain Banking",
    description:
      "Phát triển thành công ứng dụng ngân hàng số sử dụng công nghệ blockchain, được triển khai thí điểm tại 3 ngân hàng.",
    date: "Tháng 10, 2023",
    category: "Dự án",
    icon: Target,
    image: "/blockchain-banking-application-interface.png",
    tags: ["Blockchain", "Ngân hàng", "Ứng dụng"],
  },
  {
    id: 5,
    title: "Top 10 I-Star 2024",
    description:
      "Đạt Top 10 Giải thưởng Đổi mới sáng tạo I-STAR 2024 – công nhận những đóng góp tích cực của FTC trong hệ sinh thái khởi nghiệp – đổi mới sáng tạo của TP.HCM.",
    date: "Tháng 9, 2024",
    category: "Cuộc thi",
    icon: Star,
    image: "/ai-finance-competition-award-ceremony.png",
    tags: ["Đổi mới", "Top ", "Khởi nghiệp"],
  },
  {
    id: 6,
    title: "Hội thảo Quốc tế FinTech",
    description:
      "Tổ chức thành công hội thảo quốc tế về FinTech với sự tham gia của hơn 1000 người và 50 diễn giả từ 15 quốc gia.",
    date: "Tháng 6, 2023",
    category: "Sự kiện",
    icon: Calendar,
    image: "/international-fintech-conference-speakers-stage.png",
    tags: ["Hội thảo", "Quốc tế", "Diễn giả"],
  },
]

const stats = [
  { label: "Giải thưởng", value: "15+", icon: Trophy },
  { label: "Dự án hoàn thành", value: "25+", icon: Target },
  { label: "Thành viên", value: "100+", icon: Users },
  { label: "Đối tác", value: "25+", icon: Award },
]

export default function AchievementsPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-accent/20 border border-accent/40 mb-8 glow">
            <Trophy className="h-5 w-5 text-accent mr-3 animate-pulse" />
            <span className="text-sm font-bold text-accent uppercase tracking-wider">Hall of Fame</span>
          </div>
          <h1 className="font-heading font-black text-5xl sm:text-6xl text-foreground mb-6 text-glow">
            THÀNH TÍCH{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">NỔI BẬT</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto text-pretty leading-relaxed">
            Những cột mốc quan trọng và thành tựu đáng tự hào trong hành trình chinh phục
            <span className="text-accent font-bold"> công nghệ tài chính tiên tiến</span>
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="relative group bg-card/20 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-500 hover:glow overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative z-10 text-center p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 glow group-hover:scale-110 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-4xl font-heading font-black text-accent mb-2 text-glow">{stat.value}</div>
                  <div className="text-sm font-bold text-foreground/80 uppercase tracking-widest">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
              <Zap className="h-4 w-4 text-accent mr-2" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Achievement Gallery</span>
            </div>
            <h2 className="font-heading font-black text-4xl text-foreground mb-4 text-glow">HÀNH TRÌNH CHINH PHỤC</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.id}
                className="relative group bg-card/20 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-500 hover:glow overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={achievement.image || "/placeholder.svg"}
                      alt={achievement.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-accent/30">
                        <achievement.icon className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-accent/20 text-accent border-accent/30 font-bold uppercase tracking-wide"
                      >
                        {achievement.category}
                      </Badge>
                      <span className="text-xs text-foreground/60 font-mono">{achievement.date}</span>
                    </div>
                    <CardTitle className="text-xl font-heading font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-foreground/70 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {achievement.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {achievement.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="text-xs bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent/20 via-transparent to-secondary/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/10 rounded-full animate-pulse"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-accent/20 border border-accent/40 mb-8 glow">
            <Target className="h-5 w-5 text-accent mr-3" />
            <span className="text-sm font-bold text-accent uppercase tracking-wider">Join The Legacy</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-foreground mb-6 text-glow">
            TẠO NÊN THÀNH TÍCH TIẾP THEO
          </h2>
          <p className="text-xl text-foreground/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            Tham gia cùng chúng tôi để viết tiếp câu chuyện thành công của
            <span className="text-accent font-bold"> cộng đồng FinTech tiên phong</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="btn-futuristic text-lg px-10 py-4 font-bold shadow-2xl hover:shadow-accent/50 transition-all duration-300"
            >
              <Link href="/ung-tuyen">
                THAM GIA NGAY <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 bg-transparent font-bold border-2 border-accent text-accent hover:bg-accent/10 hover:glow transition-all duration-300"
            >
              <Link href="/hoat-dong">XEM HOẠT ĐỘNG</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
