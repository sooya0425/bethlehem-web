"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Navbar와 동일한 구조를 사용하여 서브메뉴 데이터 정의
// 실제로는 Navbar.tsx에서 export해서 공유하는 것이 좋으나,
// 독립적인 컴포넌트로 만들기 위해 여기서 매핑을 정의함.
const subMenuMap: Record<
  string,
  { title: string; items: { name: string; href: string }[] }
> = {
  "/intro": {
    title: "베들레헴 소개",
    items: [
      { name: "인사말", href: "/intro/greeting" },
      { name: "연혁", href: "/intro/history" },
      { name: "시설안내", href: "/facility-tour" },
      { name: "오시는 길", href: "/intro/location" },
    ],
  },
  "/facility-tour": {
    // facility-tour도 intro 카테고리로 취급
    title: "베들레헴 소개",
    items: [
      { name: "인사말", href: "/intro/greeting" },
      { name: "연혁", href: "/intro/history" },
      { name: "시설안내", href: "/facility-tour" },
      { name: "오시는 길", href: "/intro/location" },
    ],
  },
  "/news/notice": {
    title: "커뮤니티",
    items: [
      { name: "공지사항", href: "/news/notice" },
      { name: "자유게시판", href: "/news/freeboard" },
      { name: "소식지 및 자료", href: "/news/newsletter" },
    ],
  },
  "/news/freeboard": {
    title: "커뮤니티",
    items: [
      { name: "공지사항", href: "/news/notice" },
      { name: "자유게시판", href: "/news/freeboard" },
      { name: "소식지 및 자료", href: "/news/newsletter" },
    ],
  },
  "/news/newsletter": {
    title: "커뮤니티",
    items: [
      { name: "공지사항", href: "/news/notice" },
      { name: "자유게시판", href: "/news/freeboard" },
      { name: "소식지 및 자료", href: "/news/newsletter" },
    ],
  },
  "/news/gallery": {
    title: "갤러리",
    items: [
      { name: "베들레헴 이야기", href: "/news/gallery/story" },
      { name: "연중행사", href: "/news/gallery/events" },
      { name: "방문스케치", href: "/news/gallery/visit" },
      { name: "사진자료", href: "/news/gallery/photos" },
    ],
  },
  "/donation": {
    title: "후원/봉사 안내",
    items: [
      { name: "후원안내", href: "/donation" },
      { name: "봉사안내", href: "/volunteer" },
    ],
  },
  "/volunteer": {
    title: "후원/봉사 안내",
    items: [
      { name: "후원안내", href: "/donation" },
      { name: "봉사안내", href: "/volunteer" },
    ],
  },
};

export default function SubMenuNav() {
  const pathname = usePathname();

  // 현재 경로에 맞는 서브메뉴 찾기
  let currentGroup = null;

  // 1. 정확히 일치하는 키 찾기
  if (subMenuMap[pathname]) {
    currentGroup = subMenuMap[pathname];
  } else {
    const segments = pathname.split("/");
    // 2. 2depth 경로 매칭 (예: /news/notice/123 -> /news/notice)
    if (segments.length >= 3) {
      const depth2Path = `/${segments[1]}/${segments[2]}`;
      if (subMenuMap[depth2Path]) {
        currentGroup = subMenuMap[depth2Path];
      }
    }
    // 3. 1depth 경로 매칭 (예: /intro/greeting -> /intro)
    if (!currentGroup && segments.length >= 2) {
      const parentPath = `/${segments[1]}`;
      if (subMenuMap[parentPath]) {
        currentGroup = subMenuMap[parentPath];
      }
    }
  }

  if (!currentGroup) return null;

  return (
    <div className="sticky top-[80px] z-40 bg-background border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-start md:justify-center gap-2 py-4 min-w-max">
          {currentGroup.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSubMenu"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`relative z-10 ${isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
