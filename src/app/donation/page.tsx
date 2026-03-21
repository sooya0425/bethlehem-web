"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";
import { Heart, Gift, Coffee, CreditCard, ChevronRight, HandHeart } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const donationTypes = [
  {
    title: "일반후원",
    description: "일시적으로 자유로운 금액을 후원하실 수 있습니다. 한 번의 따뜻한 나눔이 베들레헴 가족에게 큰 힘이 됩니다.",
    icon: <HandHeart size={28} className="text-primary" />,
    color: "bg-primary/5",
    href: ROUTES.DONATION_APPLY_GENERAL,
  },
  {
    title: "정기후원",
    description: "매월 일정 금액을 정기적으로 후원하여 장애인들의 안정적인 생활을 돕습니다. 꾸준한 나눔이 가장 큰 사랑입니다.",
    icon: <Heart size={28} className="text-accent" />,
    color: "bg-accent/5",
    href: ROUTES.DONATION_APPLY_REGULAR,
  },
  {
    title: "물품후원",
    description: "생필품, 식료품, 의류 등 실생활에 필요한 물품을 기부하여 따뜻한 사랑을 전합니다.",
    icon: <Gift size={28} className="text-primary" />,
    color: "bg-secondary/80",
    href: ROUTES.DONATION_APPLY_GOODS,
  },
  {
    title: "결연후원",
    description: "특정 장애인과 1:1 결연을 맺어 정서적 지지와 경제적 도움을 줍니다. 한 사람의 든든한 친구가 되어주세요.",
    icon: <Coffee size={28} className="text-accent" />,
    color: "bg-muted/80",
    href: ROUTES.DONATION_APPLY_SPONSORSHIP,
  },
];

export default function DonationPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <SubMenuNav />
      
      <section className="relative pt-32 pb-20 bg-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground z-0">
          <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-background/60 to-background z-10" />
          <img src="/images/donation_hero.png" alt="후원 안내" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">나눔으로 함께하기</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              여러분의 따뜻한 손길은 베들레헴 가족들에게 <br className="hidden md:block" />
              내일을 살아갈 큰 용기와 희망이 됩니다.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {donationTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${type.color} p-8 rounded-4xl border border-transparent hover:border-border transition-all duration-300 flex flex-col`}
              >
                <div className="w-14 h-14 rounded-2xl bg-card shadow-sm flex items-center justify-center mb-6 ring-1 ring-border">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{type.description}</p>
                <Link href={type.href} className="flex items-center gap-2 text-sm font-bold group text-primary hover:underline">
                  후원 신청서 작성
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Account Info Card */}
          <div className="max-w-4xl mx-auto bg-foreground text-background rounded-5xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 text-background/80 text-sm font-medium mb-6">
                  <CreditCard size={16} />
                  후원 계좌 안내
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  따뜻한 마음을 <br /> 보내주시는 곳
                </h2>
                <div className="space-y-4">
                  <div className="group border-b border-background/10 pb-4">
                    <p className="text-background/60 text-sm mb-1 font-medium">국민은행</p>
                    <p className="text-xl md:text-2xl font-mono group-hover:text-primary transition-colors">123456 - 04 - 789012</p>
                  </div>
                  <div className="group border-b border-background/10 pb-4">
                    <p className="text-background/60 text-sm mb-1 font-medium">농협중앙회</p>
                    <p className="text-xl md:text-2xl font-mono group-hover:text-primary transition-colors">301 - 1234 - 5678 - 91</p>
                  </div>
                </div>
                <p className="mt-8 text-background/50 text-sm leading-relaxed">
                  예금주: 사회복지법인 베들레헴 <br />
                  * 후원금 영수증은 연말정산 시 소득공제 혜택을 받으실 수 있습니다.
                </p>
              </div>
              
              <div className="shrink-0 bg-background/10 backdrop-blur-md p-8 rounded-4xl border border-background/10 text-center">
                <p className="text-sm font-bold mb-4">온라인 후원 신청</p>
                <div className="w-32 h-32 bg-card rounded-2xl mx-auto mb-6 flex items-center justify-center text-card-foreground text-xs font-bold p-4">
                  QR 코드가 들어갈 자리입니다.
                </div>
                <Link href={ROUTES.DONATION_APPLY_GENERAL} className="block w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                  후원 신청서 작성
                </Link>
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
