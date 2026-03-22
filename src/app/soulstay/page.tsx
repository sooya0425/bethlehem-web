"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Sparkles, Sun, Moon, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const programs = [
  {
    title: "쉼의 시작",
    desc: "바쁜 일상에서 벗어나 자연 속에서 조용히 자신을 돌아보는 시간",
    icon: <Sun size={36} className="text-accent" />,
  },
  {
    title: "치유의 식탁",
    desc: "공동체가 정성껏 준비한 건강한 유기농 식단으로 몸과 마음을 채우기",
    icon: <Leaf size={36} className="text-primary" />,
  },
  {
    title: "영성의 밤",
    desc: "함께 기도하고 찬양하며 깊은 내면의 평화를 찾는 시간",
    icon: <Moon size={36} className="text-foreground" />,
  },
];

export default function SoulStayPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/soulstay_hero.png")' }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              당신의 영혼이 <br /> 쉬어가는 곳
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto">
              베들레헴공동체 '소울스테이'는 진정한 나를 찾고 <br className="hidden md:block" />
              삶의 에너지를 회복하는 힐링 체험 프로그램입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">프로그램 안내</h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid gap-12">
              {programs.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col md:flex-row items-center gap-8 p-8 rounded-4xl bg-card border border-border/50 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500"
                >
                  <div className="shrink-0 w-20 h-20 rounded-3xl bg-background border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/5 transition-transform duration-500">
                    {p.icon}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 p-12 rounded-4xl bg-linear-to-br from-foreground to-foreground/90 text-background text-center shadow-xl">
              <h3 className="text-3xl font-bold mb-6">참여 신청 및 문의</h3>
              <p className="text-background/70 text-lg mb-10 leading-relaxed">
                현재 '소울스테이'는 사전 예약제로 운영되고 있습니다. <br />
                궁금하신 점이나 참여 희망 날짜를 말씀해 주시면 정성껏 안내해 드리겠습니다.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href={ROUTES.SOULSTAY_APPLY}
                  className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
                >
                  예약하기
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="text-lg font-mono text-background/80">
                  TEL. 054-123-4567
                </div>
              </div>
            </div>
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
