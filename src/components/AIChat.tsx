"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass w-80 h-96 rounded-3xl mb-4 overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="font-bold text-sm">2026 AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-sm">
                안녕하세요! 무엇을 도와드릴까요? 2026년 최신 트렌드에 대해 궁금하신 점이 있나요?
              </div>
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                placeholder="질문을 입력하세요..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-primary/50"
              />
              <button className="bg-primary p-2 rounded-full hover:bg-primary/80 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="glass w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/20 transition-all border-primary/20"
      >
        <Bot className="w-6 h-6 text-primary" />
      </motion.button>
    </div>
  );
};
