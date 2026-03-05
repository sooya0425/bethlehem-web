"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <SubMenuNav />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background z-10" />
          <img src="/images/community_hero.png" alt="공동체 소식" className="w-full h-full object-cover opacity-80" />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              공동체 소식
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-muted-foreground">
            등록된 소식이 없습니다.
          </p>
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
