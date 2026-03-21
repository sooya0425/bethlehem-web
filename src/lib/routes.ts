/**
 * 중앙 라우트 매핑 시스템
 * 
 * 보안을 위해 모든 내부 페이지 경로를 난독화합니다.
 * 브라우저 주소창에는 난독화된 경로가 표시되며,
 * Next.js rewrites가 실제 파일 경로로 매핑합니다.
 * 
 * ⚠️ 새 페이지 추가 시 반드시 이 파일에 매핑을 등록하세요.
 */

// 난독화 경로 → 실제 파일 시스템 경로
export const ROUTE_MAP: Record<string, string> = {
  // -- 베들레헴 소개 --
  '/p/g7k2': '/intro/greeting',
  '/p/h3m9': '/intro/history',
  '/p/l5n1': '/intro/location',
  '/p/f8t4': '/facility-tour',

  // -- 직원/식구 소개 --
  '/p/m2b6': '/members',

  // -- 커뮤니티 --
  '/p/n4c8': '/news/notice',
  '/p/r1d5': '/news/freeboard',
  '/p/s6e3': '/news/newsletter',

  // -- 갤러리 --
  '/p/y7a2': '/news/gallery/story',
  '/p/v3k9': '/news/gallery/events',
  '/p/w1j6': '/news/gallery/visit',
  '/p/x5f8': '/news/gallery/photos',

  // -- 소울스테이 --
  '/p/q9p4': '/soulstay',
  '/p/q2a7': '/soulstay/apply',

  // -- 후원안내 --
  '/p/d4z1': '/donation',
  '/p/d1g5': '/donation/apply/general',
  '/p/d2r8': '/donation/apply/regular',
  '/p/d3k2': '/donation/apply/goods',
  '/p/d6s9': '/donation/apply/sponsorship',

  // -- 봉사안내 --
  '/p/b7v3': '/volunteer',
  '/p/b8a1': '/volunteer/apply',
};

/**
 * 페이지별 상수 (모든 내부 링크에서 사용)
 * 하드코딩된 경로 문자열 대신 반드시 이 상수를 사용하세요.
 */
export const ROUTES = {
  // 홈
  HOME: '/',

  // 베들레헴 소개
  INTRO_GREETING: '/p/g7k2',
  INTRO_HISTORY: '/p/h3m9',
  INTRO_LOCATION: '/p/l5n1',
  FACILITY_TOUR: '/p/f8t4',

  // 직원/식구 소개
  MEMBERS: '/p/m2b6',

  // 커뮤니티
  NEWS_NOTICE: '/p/n4c8',
  NEWS_FREEBOARD: '/p/r1d5',
  NEWS_NEWSLETTER: '/p/s6e3',

  // 갤러리
  GALLERY_STORY: '/p/y7a2',
  GALLERY_EVENTS: '/p/v3k9',
  GALLERY_VISIT: '/p/w1j6',
  GALLERY_PHOTOS: '/p/x5f8',

  // 소울스테이
  SOULSTAY: '/p/q9p4',
  SOULSTAY_APPLY: '/p/q2a7',

  // 후원안내
  DONATION: '/p/d4z1',
  DONATION_APPLY_GENERAL: '/p/d1g5',
  DONATION_APPLY_REGULAR: '/p/d2r8',
  DONATION_APPLY_GOODS: '/p/d3k2',
  DONATION_APPLY_SPONSORSHIP: '/p/d6s9',

  // 봉사안내
  VOLUNTEER: '/p/b7v3',
  VOLUNTEER_APPLY: '/p/b8a1',
} as const;

export type RouteKey = keyof typeof ROUTES;
