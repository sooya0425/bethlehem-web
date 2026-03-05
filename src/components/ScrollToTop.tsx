"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시 여부 결정
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-primary text-white shadow-2xl hover:bg-primary/90 hover:scale-110 transition-all group"
          aria-label="맨 위로 이동"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
          
          {/* 꾸밈 요소: 버튼 뒤에 퍼지는 듯한 오라 효과 */}
          <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping -z-10 group-hover:bg-primary/40" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
