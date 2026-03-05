"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Megaphone, MessageCircle, FileText, Image as ImageIcon, ArrowUpRight, Pin, Download } from "lucide-react";

const cards = [
  {
    title: "공지사항",
    description: "베들레헴공동체의 새롭고 중요한 소식을 가장 먼저 확인하세요.",
    icon: <Megaphone className="text-primary" />,
    className: "md:col-span-2 md:row-span-1 bg-primary/10",
    href: "/news/notice",
    content: (
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-2 rounded-full bg-primary/10">
            <Pin size={16} className="text-primary fill-primary/20" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold truncate">2026년 상반기 직원 채용 공고</h4>
            <p className="text-xs text-muted-foreground mt-0.5">운영팀 · 02.05</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-2 rounded-full bg-primary/10">
            <Pin size={16} className="text-primary fill-primary/20" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold truncate">제24회 정기 이사회 회의록 공유</h4>
            <p className="text-xs text-muted-foreground mt-0.5">이사회 · 01.20</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "갤러리 모아보기",
    description: "따뜻한 베들레헴 식구들의 일상을 사진으로 만나보세요.",
    icon: <ImageIcon className="text-accent" />,
    className: "md:col-span-1 md:row-span-2 bg-accent/10 flex flex-col justify-between group-hover:bg-accent/15",
    href: "/news/gallery/story",
    content: (
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="aspect-square rounded-2xl bg-linear-to-br from-accent/30 to-accent/10 border border-accent/20 shadow-inner flex items-center justify-center overflow-hidden relative">
            <img src="https://placehold.co/400x400/FFB6C1/FFF?text=Spring" alt="봄맞이 대청소" className="object-cover w-full h-full opacity-80 mix-blend-multiply transition-transform group-hover:scale-110" />
          </div>
          <div className="aspect-square rounded-2xl bg-linear-to-bl from-accent/20 to-accent/5 border border-accent/10 shadow-inner flex items-center justify-center overflow-hidden relative">
            <img src="https://placehold.co/400x400/FFA07A/FFF?text=Event" alt="설 명절 행사" className="object-cover w-full h-full opacity-80 mix-blend-multiply transition-transform group-hover:scale-110 delay-75" />
          </div>
        </div>
        <div className="bg-card shadow-sm rounded-2xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">최근 업데이트</p>
              <p className="text-sm font-bold text-foreground">입춘 맞이 대청소 현장</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "자유게시판",
    description: "솔직하고 따뜻한 이야기를 자유롭게 나누는 소통의 공간입니다.",
    icon: <MessageCircle className="text-secondary" />,
    className: "md:col-span-1 md:row-span-1 bg-secondary/10",
    href: "/news/freeboard",
    content: (
      <div className="mt-4 bg-card rounded-2xl p-4 border border-border shadow-sm">
        <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
          "오늘 공동체 식구들과 함께 한 산책 시간이 너무 좋았습니다. 날씨가 많이 풀렸네요!"
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium text-secondary">익명의 천사</span>
          <span className="text-xs text-muted-foreground">3시간 전</span>
        </div>
      </div>
    ),
  },
  {
    title: "소식지 및 자료",
    description: "유익한 소식지와 안내문 등 필요한 자료들을 다운로드 하세요.",
    icon: <FileText className="text-foreground" />,
    className: "md:col-span-1 md:row-span-1 bg-muted/50 border border-border/50",
    href: "/news/newsletter",
    content: (
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border hover:bg-muted transition-colors group/item cursor-pointer">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">2025년 겨울호 소식지</span>
          </div>
          <Download size={16} className="text-muted-foreground opacity-50 group-hover/item:opacity-100 group-hover/item:text-primary transition-all" />
        </div>
      </div>
    ),
  },
];

export default function BentoGrid() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">공동체 둘러보기</h2>
          <p className="text-muted-foreground">베들레헴공동체의 다양한 활동과 정보를 확인하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-8 rounded-3xl border border-transparent hover:border-border hover:shadow-xl transition-all duration-500 overflow-hidden ${card.className}`}
            >
              <Link href={card.href} className="absolute inset-0 z-10" />
              
              <div className="relative z-20 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-card shadow-sm ring-1 ring-border [&>svg]:w-6 [&>svg]:h-6">
                    {card.icon}
                  </div>
                  <div className="p-2 rounded-full bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
                
                {card.content && <div className="mt-auto">{card.content}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
