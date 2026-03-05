"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const HeroBackground3D = dynamic(() => import("./3d/HeroBackground3D"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Coded Background — 코드로 구현한 최신 트렌드 3D 씬 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          className="w-full h-full"
          camera={{ position: [0, 0, 8], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <HeroBackground3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Trendy Glassmorphism Overlay for text readability */}
      <div className="absolute inset-0 bg-background/25 z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-background/5 via-background/30 to-background/85 z-1 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >


            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
            >
              사랑으로 하나 되는 <br />
              <span className="text-primary italic">베들레헴공동체</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed"
            >
              중증장애인과 비장애인이 한 가족이 되어{" "}
              <br className="hidden md:block" />
              인간적인 사랑을 나누며 평온한 삶을 가꾸어 가는 곳입니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/facility-tour"
                className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center hover:scale-[1.03] active:scale-[0.98]"
              >
                한눈에 시설 둘러보기 GO!
              </Link>
            </motion.div>

            {/* 메인 페이지 히어로 섹션 전용 소셜 아이콘 영역 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-8 flex items-center justify-center gap-6 p-4 rounded-2xl bg-black/5 backdrop-blur-md border border-white/10 w-fit mx-auto"
            >
              <a 
                href="https://band.us/band/73778627/intro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-all hover:scale-110 active:scale-95 duration-200"
                title="네이버 밴드"
              >
                <img src="/images/band.png?v=2" alt="네이버 밴드" className="w-10 h-10 object-contain drop-shadow-md" />
              </a>
              <a 
                href="https://youtube.com/channel/UCANZIkR4Wp5teyhBtsi1dOA?si=nKy_v7J8WXgRMM_y" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-all hover:scale-110 active:scale-95 duration-200"
                title="유튜브"
              >
                <img src="/images/youtube.png?v=2" alt="유튜브" className="h-10 w-auto object-contain drop-shadow-md" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10"
      >
        <span className="text-xs font-semibold uppercase tracking-widest">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
