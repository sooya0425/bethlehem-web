"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";

const historyData = [
  {
    year: "2026",
    title: "새로운 도약",
    events: [
      "베들레헴공동체 홈페이지 리뉴얼 오픈",
      "장애인 스마트 돌봄 시스템 도입",
      "지역사회 연계 '소울스테이' 프로그램 런칭",
    ],
  },
  {
    year: "2024",
    title: "성장과 나눔",
    events: [
      "우수 사회복지시설 선정 (보건복지부)",
      "제10회 베들레헴 가족 초청의 밤 개최",
      "자원봉사자 1,000명 달성 기념식",
    ],
  },
  {
    year: "2020",
    title: "변화의 바람",
    events: [
      "베들레헴 증축 공사 완공 (생활관 확장)",
      "중증장애인 거주시설 기능보강사업 선정",
      "코로나19 대응 비대면 프로그램 개발 및 운영",
    ],
  },
  {
    year: "2015",
    title: "안정과 정착",
    events: [
      "사회복지법인 베들레헴공동체 설립 인가",
      "장애인 거주시설 신고 및 운영 개시",
      "초대 대표이사 취임",
    ],
  },
  {
    year: "2010",
    title: "씨앗을 심다",
    events: [
      "공동체 설립 준비위원회 발족",
      "포항시 북구 청하면 부지 매입",
      "첫 후원회 결성 및 봉사활동 시작",
    ],
  },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <SubMenuNav />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background z-10" />
          <img src="/images/history_hero.png" alt="걸어온 길" className="w-full h-full object-cover opacity-80" />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              걸어온 길
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-normal leading-relaxed max-w-2xl mx-auto">
              사랑과 섬김으로 장애인들과 함께해 온 <br className="hidden md:block" />
              베들레헴공동체의 소중한 발자취입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-linear-to-b from-transparent via-border to-transparent hidden md:block" />
        
        <div className="container mx-auto px-6">
          <div className="relative max-w-5xl mx-auto">
            {historyData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 mb-20 md:mb-32 relative ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Bubble (Desktop Center) */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/5 rounded-4xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="relative bg-card border border-border/50 rounded-4xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <span className="inline-block text-5xl md:text-6xl font-bold text-primary/20 mb-4 font-mono tracking-tighter">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold mb-6 text-foreground">{item.title}</h3>
                      <ul className={`space-y-3 text-muted-foreground ${index % 2 === 0 ? "md:items-end" : "md:items-start"} flex flex-col`}>
                        {item.events.map((event, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {event}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty Space for alignment */}
                <div className="w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 사회복지법인 베들레헴공동체. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
