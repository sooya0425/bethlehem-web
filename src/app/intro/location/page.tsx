"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <SubMenuNav />

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background z-10" />
          <img src="/images/location_hero.png" alt="오시는 길" className="w-full h-full object-cover opacity-80" />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              오시는 길
            </h1>
            <p className="text-xl text-white/80 font-normal leading-relaxed max-w-2xl mx-auto">
              베들레헴 공동체로 오시는 길을 안내해 드립니다.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="w-full aspect-video bg-muted rounded-4xl flex items-center justify-center text-muted-foreground mb-12">
            지도 API가 들어갈 자리입니다.
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4">주소</h3>
              <p className="text-lg text-muted-foreground">경상북도 포항시 북구 청하면 월포로 123번길 45</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">연락처</h3>
              <p className="text-lg text-muted-foreground">TEL: 054-123-4567 / FAX: 054-123-4568</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">대중교통 이용 시</h3>
              <p className="text-lg text-muted-foreground">
                포항역에서 500번 버스 탑승 후 월포해수욕장 하차 (약 40분 소요)
              </p>
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
