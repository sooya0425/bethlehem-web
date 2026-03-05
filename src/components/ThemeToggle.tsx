"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[140px] h-10 rounded-full bg-secondary/50 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/10 transition-colors group">
      {/* 왼쪽 아이콘: 텍스트 의미인 '어두운'에 맞춰 달 아이콘 강조 */}
      <div className="text-foreground/80 group-hover:text-foreground">
        {isDark ? (
          <Moon size={20} className="text-primary" fill="currentColor" />
        ) : (
          <Moon size={20} />
        )}
      </div>

   
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`relative w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
          isDark ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
        }`}
        aria-label="다크 모드 스위치"
      >
        <motion.div
          layout
          className="w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{
            x: isDark ? 20 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      </button>
    </div>
  );
}
