"use client";

import React, { useState } from "react";
import FacilityMap, { Building } from "@/components/FacilityMap";
import BuildingModal from "@/components/BuildingModal";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";

// Dummy Data
const BUILDINGS: Building[] = [
  {
    id: "main-center",
    name: "본관 (행정동)",
    description: "베들레헴 공동체의 심장부로, 사무실과 상담실이 위치해 있습니다. 방문객들을 맞이하고 전반적인 시설 운영을 지원하는 공간입니다. 따뜻한 환대가 여러분을 기다립니다.",
    top: "40%",
    left: "50%",
    images: [
      "/images/center_exterior.png",
      "/images/main_office.png",
      "/images/lobby_area.png"
    ]
  },
  {
    id: "residence-a",
    name: "사랑의 집 (거주동 A)",
    description: "가족분들이 편안하게 생활하시는 거주 공간입니다. 따스한 햇살이 잘 드는 남향으로 설계되었으며, 개인의 프라이버시와 공동체의 유대감을 동시에 고려한 안락한 보금자리입니다.",
    top: "30%",
    left: "25%",
    images: [
      "/images/residence_a.png",
      "/images/living_room.png",
      "/images/bedroom.png"
    ]
  },
  {
    id: "residence-b",
    name: "소망의 집 (거주동 B)",
    description: "또 하나의 거주 공간으로, 다양한 편의 시설이 갖추어져 있습니다. 휠체어 이동이 자유로운 배리어 프리 설계가 적용되어 있어 누구나 불편함 없이 생활할 수 있습니다.",
    top: "60%",
    left: "70%",
    images: [
      "/images/residence_b.png",
      "/images/common_area.png",
      "/images/activity_room.png"
    ]
  },
  {
    id: "therapy-center",
    name: "재활 치료 센터",
    description: "전문 치료사님들과 함께하는 재활 프로그램이 진행되는 곳입니다. 물리치료, 작업치료 등 다양한 활동을 통해 가족분들의 건강 회복과 유지를 돕습니다.",
    top: "70%",
    left: "30%",
    images: [
      "/images/therapy_center.png",
      "/images/therapy_room.png",
      "/images/gym_zone.png"
    ]
  },
    {
    id: "chapel",
    name: "작은 경당",
    description: "기도와 명상을 위한 고요한 공간입니다. 누구나 와서 마음의 평화를 찾을 수 있으며, 정기적인 미사와 영적 돌봄이 이루어지는 소중한 장소입니다.",
    top: "20%",
    left: "75%",
    images: [
      "/images/chapel_exterior.png",
      "/images/chapel_interior.png",
      "/images/altar.png"
    ]
  }
];

export default function FacilityTourPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <SubMenuNav />
      
      <main className="grow flex flex-col relative pt-20">
         {/* Title Section */}
         <div className="px-6 py-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                🏡 시설 둘러보기
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                베들레헴 공동체의 아름다운 공간들을 소개합니다.<br/>
                지도를 클릭하여 곳곳을 살펴보세요.
            </p>
         </div>

         {/* Map Section */}
         <div className="w-full max-w-7xl mx-auto px-4 pb-8">
             <FacilityMap 
                buildings={BUILDINGS}
                onBuildingClick={setSelectedBuilding}
             />
         </div>
      </main>

      <BuildingModal 
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
      />
    </div>
  );
}
