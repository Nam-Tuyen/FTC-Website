import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Target, Users, BookOpen, TrendingUp, Award, Network, Facebook, Instagram } from "lucide-react"

export default function ThongTinPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-foreground mb-8 text-balance tracking-tight text-glow leading-tight">
            CÂU LẠC BỘ <br />
            <span className="bg-gradient-to-r from-accent via-accent to-accent bg-clip-text text-transparent animate-pulse">
              CÔNG NGHỆ - TÀI CHÍNH
            </span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-4xl mx-auto text-pretty font-medium leading-relaxed italic sm:text-3xl">
            Trường Đại học Kinh tế – Luật, ĐHQG-HCM
          </p>
          <div className="flex justify-center mb-16 space-x-4">
            <Button
              asChild
              size="lg"
              className="btn-futuristic text-lg px-6 py-3 font-bold shadow-2xl hover:shadow-accent/50 transition-all duration-300"
            >
              <a href="https://www.facebook.com/clbfintechuel" target="_blank" rel="noopener noreferrer">
                FANPAGE CÂU LẠC BỘ <Facebook className="ml-3 h-6 w-6" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="btn-futuristic text-lg px-6 py-3 font-bold shadow-2xl hover:shadow-accent/50 transition-all duration-300"
            >
              <a href="https://www.instagram.com/ftcers/" target="_blank" rel="noopener noreferrer">
                INSTAGRAM CÂU LẠC BỘ <Instagram className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>

        {/* Introduction Section */}
        <Card className="bg-card/30 border-accent/20 backdrop-blur-sm shadow-md shadow-accent/10 -mt-px mb-12">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Giới thiệu chung</h2>
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Câu lạc bộ Công nghệ và Tài chính FTC trực thuộc Khoa Tài chính và Ngân hàng, Trường Đại học Kinh tế và Luật, Đại học Quốc gia Thành phố Hồ Chí Minh, được thành lập vào tháng mười một năm 2020 dưới sự hướng dẫn của ThS. NCS Phan Huy Tâm, Giảng viên Khoa Tài chính - Ngân hàng, Chủ nhiệm câu lạc bộ, cùng đội ngũ sinh viên yêu thích lĩnh vực công nghệ tài chính. UEL là một trong tám đơn vị thành viên của Đại học Quốc gia Thành phố Hồ Chí Minh, là trung tâm đào tạo và nghiên cứu đa ngành, đa lĩnh vực, có uy tín hàng đầu phía Nam trong các khối Kinh tế, Luật, Quản lý công.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-card/30 border-accent/20 backdrop-blur-sm shadow-md shadow-accent/10">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Sứ mệnh</h2>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                Mang lại giá trị thiết thực cho sinh viên thông qua hệ sinh thái học thuật, thực hành và kết nối nghề nghiệp trong lĩnh vực công nghệ tài chính.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-accent/20 backdrop-blur-sm shadow-md shadow-accent/10">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-8 w-8 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Giá trị cốt lõi</h2>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                Câu lạc bộ đề cao các giá trị cốt lõi giáo dục, kết nối, chia sẻ và hoạt động theo phương châm thống nhất, vượt trội, tiên phong.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Objectives */}
        <Card className="bg-card/30 border-accent/20 backdrop-blur-sm shadow-md shadow-accent/10 mb-12">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Mục tiêu hoạt động</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <p className="text-foreground/90 leading-relaxed">
                  Cập nhật và truyền đạt kiến thức về tài chính định lượng, dữ liệu và sản phẩm số.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Network className="h-6 w-6 text-accent" />
                </div>
                <p className="text-foreground/90 leading-relaxed">
                  Kết nối sinh viên với giảng viên, chuyên gia, doanh nghiệp và nhà tuyển dụng.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <p className="text-foreground/90 leading-relaxed">
                  Xây dựng cộng đồng học thuật cởi mở: cùng học, cùng làm, cùng chia sẻ.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="bg-card/30 border-accent/20 backdrop-blur-sm shadow-md shadow-accent/10 mb-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Tầm nhìn</h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed max-w-4xl mx-auto">
              <p className="text-lg">
                FTC đặt mục tiêu trở thành cộng đồng sinh viên yêu thích công nghệ tài chính lớn nhất Việt Nam và mở rộng mạng lưới hợp tác giữa sinh viên và doanh nghiệp trong khu vực Đông Nam Á.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Activities */}
        <Card className="bg-card/30 border-accent/20 backdrop-blur-sm shadow-md shadow-accent/10 mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Hoạt động tiêu biểu</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4 group rounded-xl p-5 bg-card/40 border border-accent/15 hover:bg-card/60 transition-colors">
                  <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Hội thảo, toạ đàm, chuyên đề</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      Các chủ đề trọng tâm gồm xu hướng công nghệ tài chính, ứng dụng dữ liệu và trí tuệ nhân tạo trong hoạt động tài chính, phát triển sản phẩm ngân hàng số, diễn biến thị trường vốn và các phương pháp quản trị rủi ro hiện đại.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group rounded-xl p-5 bg-card/40 border border-accent/15 hover:bg-card/60 transition-colors">
                  <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Cuộc thi học thuật và dự án thực hành</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      Thiết kế mô hình, phát triển công cụ phân tích và kiểm thử trên dữ liệu thực tế.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 group rounded-xl p-5 bg-card/40 border border-accent/15 hover:bg-card/60 transition-colors">
                  <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Kết nối nghề nghiệp</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      Kết nối và trao đổi cùng chuyên gia, người hướng dẫn, tiếp cận cơ hội thực tập và ngày hội việc làm, đồng thời tham quan doanh nghiệp để hiểu rõ môi trường làm việc thực tế.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group rounded-xl p-5 bg-card/40 border border-accent/15 hover:bg-card/60 transition-colors">
                  <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Cộng đồng học thuật</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      Tổ chức nhóm nghiên cứu sinh viên, duy trì diễn đàn chia sẻ tài liệu, triển khai giờ lập trình định kỳ và nhóm đọc để củng cố nền tảng học thuật và học hỏi lẫn nhau.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
