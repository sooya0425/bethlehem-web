---
description: 베들레헴 홈페이지 제작 시 반드시 준수해야 하는 최신 트렌드 및 기능, 다크/라이트 모드, 코딩 컨벤션 규칙
---

# 베들레헴 홈페이지 제작 표준 지침

새로운 페이지나 컴포넌트를 만들거나 기존 것을 수정할 때 아래 규칙을 반드시 따릅니다.

## 1. 반응형 디자인 (필수)

모든 페이지와 컴포넌트는 아래 3가지 해상도에서 문제 없이 표시되어야 합니다. 모바일 우선(Mobile-First)으로 작업하며, `md:`, `lg:` 접두사를 활용해 데스크탑으로 확장합니다.

| 디바이스 | 최소 너비 | 기준 해상도 | Tailwind 접두사    |
| -------- | --------- | ----------- | ------------------ |
| 모바일   | 320px     | 375×812     | 기본 (접두사 없음) |
| 태블릿   | 768px     | 768×1024    | `md:`              |
| 데스크톱 | 1024px    | 1280×800    | `lg:`              |

### 필수 점검 사항

1. **가로 스크롤 금지**: 어떤 해상도에서도 가로 스크롤이 발생하면 안 됩니다.
2. **텍스트 넘침 금지**: 텍스트가 컨테이너 밖으로 넘어가면 안 됩니다.
3. **요소 겹침 금지**: 버튼, 이미지, 텍스트가 겹치면 안 됩니다.
4. **터치 대상 크기**: 모바일에서 터치 가능한 요소는 최소 44×44px 이상이어야 합니다.
5. **이미지 비율 유지**: 이미지에 고정 높이를 지정하지 마세요. `w-full h-auto` 또는 `aspect-ratio` 사용을 권장합니다.
6. **지도/핀 오버레이**: 이미지 위에 핀을 놓으려면 반드시 `<img>` 태그 + `position: relative` 컨테이너를 사용하고, `background-image: cover`는 피합니다.

### Tailwind CSS 반응형 패턴 예시

```tsx
// 그리드
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// 패딩/마진
<div className="px-4 md:px-6 lg:px-8">

// 텍스트 크기
<h1 className="text-2xl md:text-4xl lg:text-5xl">
```

## 2. 작업 당일 기준 최신 트렌드 디자인 및 기능 적용

특정 연도에 얽매이지 않고, **작업을 진행하는 당일을 기준**으로 언제나 가장 세련되고 진보된 웹 디자인 트렌드와 기술 트렌드를 반영합니다. 또한, 겉모습(스타일)뿐만 아니라 **현재 웹사이트(베들레헴)에 적합한 최신 웹 기능(예: 성능 최적화 기법, 최신 접근성, 유용한 인터랙션 기술 등)이 있는지 항상 고민하고 능동적으로 제안 및 적용**합니다.

- [ ] **적합한 최신 기능 검토 및 적용 (핵심)**: 작업 시점의 최신 기술 중 현재 페이지의 성격(후원, 봉사, 정보 전달 등)에 도움이 되는 유용한 기능이나 라이브러리가 있다면 적극 도입합니다.
- [ ] **Scrollytelling & 애니메이션**: 스크롤에 따라 콘텐츠가 자연스럽게 나타나는 인터랙티브 애니메이션 적용 (`framer-motion`의 `whileInView` 활용). 부드러운 전환(`transition-all duration-300`)과 마이크로 애니메이션(`hover:scale-105` 등)을 적극 사용합니다.
- [ ] **Bold Typography**: 제목은 크고 굵게 (h1: `text-4xl md:text-6xl font-bold`), 부제목/본문은 `text-muted-foreground`로 가독성을 높입니다.
- [ ] **Glassmorphism & 모서리 처리**: `backdrop-blur-md bg-card/90` 와 같은 글래스모피즘 효과와 부드러운 모서리(`rounded-2xl` ~ `rounded-4xl`)를 사용한 카드 레이아웃(`bg-card border border-border`)을 준수합니다.
- [ ] **SEO 준수**: 페이지마다 적절한 `<h1>` 태그를 하나만 사용하고 시멘틱 HTML 구조를 구성합니다.

## 3. 다크/라이트 모드 규칙

### 절대 금지 사항

- ❌ `text-gray-900`, `text-black`, `bg-white` 등 **하드코딩된 색상 사용 불가**. 라이트/다크 모드 전환 시 눈부심이나 가독성 저하를 유발합니다.
- ❌ `bg-black/5`, `border-black/10` 등 **하드코딩된 투명 색상 사용 불가**.

### 반드시 사용할 시멘틱 색상 변수

| 용도        | 클래스                       |
| ----------- | ---------------------------- |
| 배경        | `bg-background`              |
| 텍스트      | `text-foreground`            |
| 보조 텍스트 | `text-muted-foreground`      |
| 카드 배경   | `bg-card`                    |
| 테두리      | `border-border`              |
| 강조        | `text-primary`, `bg-primary` |
| 보조 배경   | `bg-secondary`, `bg-muted`   |

### `dark:` 접두사 사용 규칙

- 시스템 전역에 설정된 시멘틱 변수만으로 부족할 때만 `dark:` 접두사를 예외적으로 사용합니다 (예: `bg-rose-50 dark:bg-rose-950/20`).
- 아이콘 색상이 한 모드에서 보이지 않을 수 있으므로 반드시 양쪽 모드를 모두 확인합니다.

## 4. 코딩 컨벤션 (Tailwind v4)

- **파일 최상단**: `"use client"` 지시문이 필요할 경우 파일 맨 위에 배치합니다.
- **컴포넌트 명명 규칙**: PascalCase를 사용합니다. (예: `FacilityMap.tsx`)
- **컨테이너**: 콘텐츠 구역은 `container mx-auto px-6`를 사용해 감쌉니다.
- **높이 지정**: 고정 높이(`h-[500px]`, `h-[50vh]`) 대신 `min-h-screen`, `grow`, `auto` 등 유연한 높이를 사용하여 기기별로 짤림이 없도록 합니다.
- **Tailwind v4 문법**:
  - `bg-gradient-to-b` → `bg-linear-to-b`
  - `rounded-[2rem]` → `rounded-4xl`
  - `w-[1px]` → `w-px`
  - `aspect-[3/4]` 절대 금지 → `aspect-3/4` 사용 (대괄호 제거)

### 🚨 네비게이션 헤더 솔리드 배경 규칙 (중요)

메인 메뉴바(`Navbar`)와 서브 메뉴바(`SubMenuNav`) 등 화면 최상단에 고정(`fixed` 또는 `sticky`)되어 렌더링되는 모든 네비게이션 헤더 요소는 배경에 **투명도(`bg-background/80`, `backdrop-blur-md` 등)를 주지 않고 솔리드한 단색 속성(`bg-background`)만을 적용**하여 뒷쪽 콘텐츠와 겹쳐 보이는 것을 방지해야 합니다.

## 5. 페이지 기본 구조 템플릿

```tsx
"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";

export default function PageName() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      {/* 헤더 메뉴는 모두 bg-background 등 투명도 없는 솔리드 배경 적용 */}
      <Navbar />
      <SubMenuNav />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* ... */}
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">{/* ... */}</div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 사회복지법인 베들레헴공동체. All rights
          reserved.
        </div>
      </footer>
    </main>
  );
}
```

## 6. 최종 검증 절차

새 페이지나 컴포넌트 작업 후 꼼꼼히 리뷰합니다.

1. **빌드 오류 확인**: `npm run build`를 실행하여 문법 오류나 lint 경고(0개 상태)가 없는지 점검합니다.
2. **반응형 체크**: 모바일(320px~), 태블릿(768px~), 데스크탑(1024px~) 3가지 해상도에서 레이아웃 깨짐, 가로 스크롤 여부를 확인합니다.
3. **다크/라이트 모드 체크**: 각 모드 전환 시 텍스트, 배경, 아이콘 가시성이 분명하고 하드코딩된 색상이 튀지 않는지 양쪽 모두 점검합니다.
4. **SubMenuNav 확인**: 서브 메뉴바가 필요한 페이지인지 확인하고 누락되었다면 추가합니다.

## 7. URL 보안 및 라우트 난독화 규칙 (필수)

외부에서 URL만으로 사이트 구조를 파악하지 못하도록, 모든 내부 페이지 경로는 **난독화된 코드 경로**로 노출됩니다.

### 핵심 원칙

- ❌ **하드코딩된 경로 문자열 사용 절대 금지**: `href="/intro/greeting"`, `href="/donation"` 등 직접 경로 문자열을 사용하면 안 됩니다.
- ✅ **반드시 `ROUTES` 상수 사용**: `import { ROUTES } from "@/lib/routes"` 후 `href={ROUTES.INTRO_GREETING}` 형태로 사용합니다.

### 새 페이지 추가 시 체크리스트

1. `src/lib/routes.ts`의 `ROUTE_MAP`에 난독화 경로 → 실제 파일 경로 매핑 추가
2. `src/lib/routes.ts`의 `ROUTES` 객체에 상수 이름 추가
3. `SubMenuNav.tsx`의 `subMenuMap`에 해당 난독화 경로 키 등록
4. 모든 링크에서 `ROUTES.새_상수` 사용

### 코드 예시

```tsx
// ✅ 올바른 방법
import { ROUTES } from "@/lib/routes";

<Link href={ROUTES.INTRO_GREETING}>인사말</Link>
<a href={ROUTES.DONATION}>후원안내로 돌아가기</a>

// ❌ 잘못된 방법
<Link href="/intro/greeting">인사말</Link>
<a href="/donation">후원안내로 돌아가기</a>
```

