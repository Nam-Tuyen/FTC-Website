"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, Shield, Cpu, Info } from "lucide-react"
import Image from "next/image"

const navigationItems = [
  { name: "Trang chủ", href: "/", icon: Zap },
  { name: "Thông tin", href: "/thong-tin", icon: Info },
  { name: "Thành tích", href: "/thanh-tich", icon: Shield },
  { name: "Hoạt động", href: "/hoat-dong", icon: Cpu },
  { name: "Cơ cấu", href: "/co-cau", icon: Shield },
  { name: "Diễn đàn", href: "/dien-dan", icon: Zap },
  { name: "Ứng tuyển", href: "/ung-tuyen", icon: Cpu },
  { name: "Chatbot", href: "/chatbot", icon: Zap },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="gradient-bg border-b border-accent/30 sticky top-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <Image
                  src="/ftc-logo.png"
                  alt="Financial Technology Club Logo"
                  width={50}
                  height={50}
                  className="rounded-full glow transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full border-2 border-accent animate-pulse opacity-50"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-foreground text-glow font-extrabold text-5xl tracking-wide">
                  FTC
                </span>
                <span className="text-xs text-accent font-medium tracking-wider uppercase">{""}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-accent/10"
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-accent group-hover:text-foreground transition-colors" />
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors uppercase tracking-wide">
                        {item.name}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
                    <div className="absolute inset-0 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="relative bg-accent/10 hover:bg-accent/20 border border-accent/30 glow"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 h-6 w-6 text-accent transition-all duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                />
                <X
                  className={`absolute inset-0 h-6 w-6 text-accent transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-2 pt-4 pb-6 space-y-2 bg-card/50 backdrop-blur-md rounded-xl mt-4 border border-accent/20 glow overflow-y-auto overscroll-contain max-h-[60vh] pr-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-accent/10"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5 text-accent group-hover:text-foreground transition-colors" />
                  <span className="text-foreground/80 group-hover:text-foreground transition-colors uppercase tracking-wide">
                    {item.name}
                  </span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 border-r-2 border-t-2 border-accent rotate-45"></div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
