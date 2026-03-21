"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Heart, Target, Clock, MapPin } from "lucide-react";

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-20 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">베들레헴 소개</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              "언제나 기뻐하고 끊임없이 기도하고 모든 일에 감사하자" <br />
              베들레헴공동체는 사랑과 섬김으로 함께하는 가족 친화적 거주시설입니다.
            </p>
          </motion.div>
        </div>
      </section>

      <GreetingsSection />
      <FacilitySection />
      <LocationSection />

      <footer className="py-12 border-t border-border bg-muted/30 mt-auto">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 사회복지법인 베들레헴공동체. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

// --- 하위 섹션 컴포넌트들 ---

const GreetingsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/intro_greetings.png")' }}
          />
          <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-background/20" />
          <div className="absolute inset-0 flex items-end justify-center pb-8 p-12">
            <div className="bg-background/80 backdrop-blur-md px-6 py-4 rounded-2xl text-foreground font-bold italic text-center text-lg shadow-lg border border-border">
              "사랑으로 꿈을 가꾸는 공간<br/>베들레헴공동체입니다"
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">설립 배경 및 목적</h3>
              <p className="text-muted-foreground leading-relaxed">
                육체적 장애로 소외받는 중증 장애인과 비장애인이 한 가족이 되어 
                인간적인 사랑을 나누며 살아가기 위해 설립되었습니다. 
                단순한 보호를 넘어 삶의 질을 높이고 사회적 통합을 지향합니다.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">미션과 비전</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>복음과 함께하는 가족공동체 구현</li>
                <li>장애인의 자립과 존엄성 존중</li>
                <li>지역사회와 소통하는 열린 공동체</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">공동체 역사</h3>
              <p className="text-muted-foreground">
                19XX년 첫 발을 내딛은 이래, 수많은 자원봉사자와 후원자들의 사랑으로 
                지금의 믿음, 소망, 사랑, 기쁨동이 있는 보금자리를 마련하게 되었습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FacilitySection = () => {
  const [selectedBuilding, setSelectedBuilding] = React.useState<Building | null>(null);

  return (
    <section id="facility" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Environment</span>
          <h2 className="text-4xl font-bold mt-2">함께 머무는 보금자리</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            자연과 어우러진 베들레헴공동체의 시설을 소개합니다. <br className="hidden md:block" />
            각 위치를 클릭하여 내부 모습을 미리 보실 수 있습니다.
          </p>
        </div>

        <div className="aspect-video w-full max-w-5xl mx-auto">
          <FacilityMap buildings={buildingsData} onBuildingClick={setSelectedBuilding} />
        </div>
      </div>

      <BuildingModal 
        building={selectedBuilding} 
        onClose={() => setSelectedBuilding(null)} 
      />
    </section>
  );
};

const LocationSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="bg-card rounded-4xl p-12 shadow-sm border border-border flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <MapPin className="text-primary" />
            찾아오시는 길
          </h2>
          <p className="text-muted-foreground">
            경상북도 포항시 북구 송라면 대전리 123-4 <br />
            (도로명: 포항시 북구 송라면 대전길 56)
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">카카오맵 보기</button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-500/20 hover:scale-105 transition-transform">네이버 지도 보기</button>
        </div>
      </div>
    </div>
  </section>
);

// --- 데이터 정의 ---

import FacilityMap, { Building } from "@/components/FacilityMap";
import BuildingModal from "@/components/BuildingModal";

const buildingsData: Building[] = [
  {
    id: "faith",
    name: "믿음동 (거주시설)",
    description: "우리 식구들이 가장 많은 시간을 보내는 따뜻한 거실과 개인 침실이 있는 주요 생활관입니다. 넓은 창문으로 들어오는 햇살이 일품입니다.",
    top: "30%",
    left: "25%",
    images: [
      "/images/intro_living.png",
      "/images/intro_bedroom.png",
    ]
  },
  {
    id: "hope",
    name: "소망동 (교육지원)",
    description: "직업 훈련과 원예 학습 등 다양한 프로그램이 이루어지는 공간입니다. 식구들의 꿈이 자라는 소중한 교육의 장입니다.",
    top: "45%",
    left: "60%",
    images: [
      "/images/intro_program.png",
      "/images/intro_training.png",
    ]
  },
  {
    id: "love",
    name: "사랑동 (다목적실)",
    description: "예배, 공연, 영화 관람 등 공동체 전체의 행사가 열리는 큰 강당입니다. 모두가 모여 웃음꽃을 피우는 소통의 중심지입니다.",
    top: "70%",
    left: "40%",
    images: [
      "/images/intro_hall.png",
    ]
  },
  {
    id: "garden",
    name: "치유의 정원",
    description: "사계절 내내 꽃과 나무를 가꾸는 정원입니다. 산책로를 따라 걸으며 자연의 평온함을 만끽할 수 있습니다.",
    top: "20%",
    left: "75%",
    images: [
      "/images/intro_garden.png",
      "/images/intro_relax.png",
    ]
  }
];
