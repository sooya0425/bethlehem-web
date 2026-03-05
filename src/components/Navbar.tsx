"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

interface SubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  subItems?: SubItem[];
}

const navItems: NavItem[] = [
  {
    name: "베들레헴 소개",
    href: "/intro/greeting",
    subItems: [
      { name: "인사말", href: "/intro/greeting" },
      { name: "연혁", href: "/intro/history" },
      { name: "시설안내", href: "/facility-tour" },
      { name: "오시는 길", href: "/intro/location" },
    ],
  },
  { name: "직원/식구 소개", href: "/members" },
  {
    name: "커뮤니티",
    href: "/news/notice",
    subItems: [
      { name: "공지사항", href: "/news/notice" },
      { name: "자유게시판", href: "/news/freeboard" },
      { name: "소식지 및 자료", href: "/news/newsletter" },
    ],
  },
  {
    name: "갤러리",
    href: "/news/gallery/story",
    subItems: [
      { name: "베들레헴 이야기", href: "/news/gallery/story" },
      { name: "연중행사", href: "/news/gallery/events" },
      { name: "방문스케치", href: "/news/gallery/visit" },
      { name: "사진자료", href: "/news/gallery/photos" },
    ],
  },
  { name: "소울스테이", href: "/soulstay" },
  {
    name: "후원/봉사 안내",
    href: "/donation",
    subItems: [
      { name: "후원안내", href: "/donation" },
      { name: "봉사안내", href: "/volunteer" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileItem = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background border-b border-border/50 shadow-xs ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between md:justify-center items-center gap-8 xl:gap-24">
        <Link
          href="/"
          onClick={(e) => handleClick(e, "/")}
          className="flex items-center gap-2 group"
        >
          <div className="bg-primary p-2 rounded-full text-white group-hover:scale-110 transition-transform">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className={`text-xl font-bold tracking-tight text-foreground`}>
            베들레헴공동체
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              item.subItems?.some((sub) => pathname === sub.href);
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => hasSubItems && setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-primary font-bold bg-primary/5"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                  {hasSubItems && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${hoveredItem === item.name ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {hasSubItems && hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2 w-48 z-50"
                    >
                      <div className="bg-background border border-border rounded-2xl shadow-xl p-2 overflow-hidden flex flex-col gap-1">
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`px-4 py-2.5 rounded-xl text-sm transition-colors ${
                              pathname === sub.href
                                ? "bg-primary/10 text-primary font-bold"
                                : "hover:bg-secondary text-foreground/70 hover:text-foreground"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="ml-4 flex items-center gap-3 border-l border-border pl-4">
            <a 
              href="https://band.us/band/73778627/intro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              title="네이버 밴드"
            >
              <img src="/images/band.png?v=2" alt="네이버 밴드" className="w-6 h-6 object-contain" />
            </a>
            <a 
              href="https://youtube.com/channel/UCANZIkR4Wp5teyhBtsi1dOA?si=nKy_v7J8WXgRMM_y" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              title="유튜브"
            >
              <img src="/images/youtube.png?v=2" alt="유튜브" className="h-6 w-auto object-contain" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle Group */}
        <div className="md:hidden flex items-center gap-3">
          <a 
            href="https://band.us" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <img src="/images/band.png?v=2" alt="네이버 밴드" className="w-6 h-6 object-contain" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <img src="/images/youtube.png?v=2" alt="유튜브" className="h-6 w-auto object-contain" />
          </a>
          <ThemeToggle />
          <button
            className="text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴 열기"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  item.subItems?.some((sub) => pathname === sub.href);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isExpanded = expandedItems.includes(item.name);

                return (
                  <div key={item.name} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`grow text-lg font-medium py-3 px-4 rounded-xl transition-all ${
                          isActive && !hasSubItems
                            ? "bg-primary/10 text-primary font-bold"
                            : "hover:bg-secondary/50"
                        }`}
                        onClick={(e) => {
                          if (!hasSubItems) {
                            handleClick(e, item.href);
                            setIsOpen(false);
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                      {hasSubItems && (
                        <button
                          onClick={() => toggleMobileItem(item.name)}
                          className="p-3"
                        >
                          <ChevronDown
                            size={20}
                            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {hasSubItems && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col ml-4 border-l-2 border-primary/10 gap-1 mt-1 mb-2"
                        >
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`text-base py-2.5 px-6 rounded-xl transition-all ${
                                pathname === sub.href
                                  ? "text-primary font-bold bg-primary/5"
                                  : "text-foreground/70"
                              }`}
                              onClick={(e) => {
                                handleClick(e, sub.href);
                                setIsOpen(false);
                              }}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
