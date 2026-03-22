"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/routes";

// Navbar와 동일한 구조를 사용하여 서브메뉴 데이터 정의
// 난독화된 경로를 키와 href로 사용합니다.
const subMenuMap: Record<
  string,
  { title: string; items: { name: string; href: string }[] }
> = {
  [ROUTES.INTRO_GREETING]: {
    title: "베들레헴 소개",
    items: [
      { name: "인사말", href: ROUTES.INTRO_GREETING },
      { name: "연혁", href: ROUTES.INTRO_HISTORY },
      { name: "시설안내", href: ROUTES.FACILITY_TOUR },
      { name: "오시는 길", href: ROUTES.INTRO_LOCATION },
    ],
  },
  [ROUTES.INTRO_HISTORY]: {
    title: "베들레헴 소개",
    items: [
      { name: "인사말", href: ROUTES.INTRO_GREETING },
      { name: "연혁", href: ROUTES.INTRO_HISTORY },
      { name: "시설안내", href: ROUTES.FACILITY_TOUR },
      { name: "오시는 길", href: ROUTES.INTRO_LOCATION },
    ],
  },
  [ROUTES.INTRO_LOCATION]: {
    title: "베들레헴 소개",
    items: [
      { name: "인사말", href: ROUTES.INTRO_GREETING },
      { name: "연혁", href: ROUTES.INTRO_HISTORY },
      { name: "시설안내", href: ROUTES.FACILITY_TOUR },
      { name: "오시는 길", href: ROUTES.INTRO_LOCATION },
    ],
  },
  [ROUTES.FACILITY_TOUR]: {
    // facility-tour도 intro 카테고리로 취급
    title: "베들레헴 소개",
    items: [
      { name: "인사말", href: ROUTES.INTRO_GREETING },
      { name: "연혁", href: ROUTES.INTRO_HISTORY },
      { name: "시설안내", href: ROUTES.FACILITY_TOUR },
      { name: "오시는 길", href: ROUTES.INTRO_LOCATION },
    ],
  },
  [ROUTES.NEWS_NOTICE]: {
    title: "커뮤니티",
    items: [
      { name: "공지사항", href: ROUTES.NEWS_NOTICE },
      { name: "자유게시판", href: ROUTES.NEWS_FREEBOARD },
      { name: "소식지 및 자료", href: ROUTES.NEWS_NEWSLETTER },
    ],
  },
  [ROUTES.NEWS_FREEBOARD]: {
    title: "커뮤니티",
    items: [
      { name: "공지사항", href: ROUTES.NEWS_NOTICE },
      { name: "자유게시판", href: ROUTES.NEWS_FREEBOARD },
      { name: "소식지 및 자료", href: ROUTES.NEWS_NEWSLETTER },
    ],
  },
  [ROUTES.NEWS_NEWSLETTER]: {
    title: "커뮤니티",
    items: [
      { name: "공지사항", href: ROUTES.NEWS_NOTICE },
      { name: "자유게시판", href: ROUTES.NEWS_FREEBOARD },
      { name: "소식지 및 자료", href: ROUTES.NEWS_NEWSLETTER },
    ],
  },
  [ROUTES.GALLERY_STORY]: {
    title: "갤러리",
    items: [
      { name: "베들레헴 이야기", href: ROUTES.GALLERY_STORY },
      { name: "연중행사", href: ROUTES.GALLERY_EVENTS },
      { name: "방문스케치", href: ROUTES.GALLERY_VISIT },
      { name: "사진자료", href: ROUTES.GALLERY_PHOTOS },
    ],
  },
  [ROUTES.GALLERY_EVENTS]: {
    title: "갤러리",
    items: [
      { name: "베들레헴 이야기", href: ROUTES.GALLERY_STORY },
      { name: "연중행사", href: ROUTES.GALLERY_EVENTS },
      { name: "방문스케치", href: ROUTES.GALLERY_VISIT },
      { name: "사진자료", href: ROUTES.GALLERY_PHOTOS },
    ],
  },
  [ROUTES.GALLERY_VISIT]: {
    title: "갤러리",
    items: [
      { name: "베들레헴 이야기", href: ROUTES.GALLERY_STORY },
      { name: "연중행사", href: ROUTES.GALLERY_EVENTS },
      { name: "방문스케치", href: ROUTES.GALLERY_VISIT },
      { name: "사진자료", href: ROUTES.GALLERY_PHOTOS },
    ],
  },
  [ROUTES.GALLERY_PHOTOS]: {
    title: "갤러리",
    items: [
      { name: "베들레헴 이야기", href: ROUTES.GALLERY_STORY },
      { name: "연중행사", href: ROUTES.GALLERY_EVENTS },
      { name: "방문스케치", href: ROUTES.GALLERY_VISIT },
      { name: "사진자료", href: ROUTES.GALLERY_PHOTOS },
    ],
  },
  [ROUTES.DONATION]: {
    title: "후원/봉사 안내",
    items: [
      { name: "후원안내", href: ROUTES.DONATION },
      { name: "봉사안내", href: ROUTES.VOLUNTEER },
    ],
  },
  [ROUTES.VOLUNTEER]: {
    title: "후원/봉사 안내",
    items: [
      { name: "후원안내", href: ROUTES.DONATION },
      { name: "봉사안내", href: ROUTES.VOLUNTEER },
    ],
  },
};

export default function SubMenuNav() {
  const pathname = usePathname();

  // 현재 경로에 맞는 서브메뉴 찾기
  const currentGroup = subMenuMap[pathname] || null;

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
