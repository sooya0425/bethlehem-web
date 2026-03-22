"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Search, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    category: "공지사항",
    title: "2026년 상반기 생활지도원 채용 공고",
    date: "2026-02-05",
    description: "베들레헴공동체와 함께할 따뜻한 마음을 가진 가족을 찾습니다. 많은 관심 부탁드립니다.",
  },
  {
    id: 2,
    category: "활동소식",
    title: "입춘 맞이 공동체 봄맞이 대청소 현장",
    date: "2026-02-04",
    description: "포항의 맑은 공기와 함께 겨우내 묵은 먼지를 털어내고 봄을 맞이하는 시간을 가졌습니다.",
  },
  {
    id: 3,
    category: "공지사항",
    title: "제24회 정기 이사회 회의록 공유",
    date: "2026-01-20",
    description: "법인 운영의 투명성을 위해 지난달 열린 이사회 회의록을 공유합니다.",
  },
  {
    id: 4,
    category: "활동소식",
    title: "설 명절 떡국 나누기 행사",
    date: "2026-01-28",
    description: "후원자님들의 따뜻한 정성으로 모두가 즐거운 설 명절을 보냈습니다.",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">커뮤니티</h1>
              <p className="text-muted-foreground">베들레헴공동체의 매일매일 변화하는 따뜻한 이야기들입니다.</p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input 
                type="text" 
                placeholder="검색어를 입력하세요"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card p-8 rounded-4xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <Link href={`/news/${item.id}`} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.category === "공지사항" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                      }`}>
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Calendar size={14} />
                        {item.date}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h2>
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-muted group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all">
                    <ChevronRight size={24} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-2">
            {[1, 2, 3].map(page => (
              <button 
                key={page}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  page === 1 ? "bg-primary text-white" : "bg-card text-foreground border border-border hover:border-primary/50"
                 }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-muted/30 mt-auto">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 사회복지법인 베들레헴공동체. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
