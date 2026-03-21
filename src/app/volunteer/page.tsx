"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, PhoneCall, Info } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const steps = [
  { title: "봉사 문의", desc: "전화 또는 온라인을 통해 봉사 가능 여부를 확인합니다.", icon: <PhoneCall size={24} /> },
  { title: "신청서 작성", desc: "봉사자 기본 인적사항과 희망 일시를 작성합니다.", icon: <FileText size={24} /> },
  { title: "봉사 실시", desc: "배정된 구역에서 담당자의 안내에 따라 봉사를 진행합니다.", icon: <Users size={24} /> },
  { title: "확인서 발급", desc: "VMS 시스템을 통해 봉사 실적을 등록하고 확인서를 발급받습니다.", icon: <CheckCircle size={24} /> },
];

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <SubMenuNav />
      
      <section className="relative pt-32 pb-20 bg-muted/50 transition-colors overflow-hidden">
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground z-0">
          <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-background/60 to-background z-10" />
          <img src="/images/volunteer_hero.png" alt="봉사 안내" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">함께하는 기쁨</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              작은 나눔이 모여 커다란 행복이 됩니다. <br className="hidden md:block" />
              베들레헴 식구들과 따뜻한 시간을 나누어 주세요.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">봉사 절차 안내</h2>
            <div className="grid md:grid-cols-4 gap-8 mb-24">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 z-10">
                    {step.icon}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border z-0" />
                  )}
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-card p-10 rounded-4xl border border-border h-full shadow-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Info className="text-primary" />
                  봉사 시 유의사항
                </h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    장애인들의 개인 정보와 사생활을 존중해 주세요.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    봉사 당일 신분증을 지참해 주시고 시간을 엄수해 주세요.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    신체 대면 봉사는 시설의 안내 지침을 반드시 따라주세요.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    단체 봉사의 경우 최소 2주 전에 사전 예약이 필요합니다.
                  </li>
                </ul>
              </div>

              <div className="bg-card p-10 rounded-4xl border border-border shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-6">온라인 신청하기</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    아래 버튼을 눌러 자원봉사 신청서를 작성해 주세요. <br />
                    담당자가 확인 후 개별 연락드립니다.
                  </p>
                </div>
                <Link
                  href={ROUTES.VOLUNTEER_APPLY}
                  className="block w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-center hover:opacity-90 transition-all shadow-xl shadow-primary/20"
                >
                  자원봉사 신청서 작성
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
