"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";

export default function PreparingPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <SubMenuNav />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
          <img src="/images/story_hero.png" alt="공동체 이야기" className="w-full h-full object-cover opacity-80" />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              페이지 준비 중
            </h1>
            <p className="text-xl text-white/80 font-normal leading-relaxed max-w-2xl mx-auto">
              현재 이 페이지는 준비 중에 있습니다.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">곧 찾아뵙겠습니다</h2>
          <p className="text-muted-foreground">더 나은 원활한 서비스를 위해 페이지를 준비 중입니다. 잠시만 기다려주세요.</p>
        </div>
      </section>
    </main>
  );
}
