"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export interface Building {
  id: string;
  name: string;
  description: string;
  top: string;
  left: string;
  images: string[]; // URLs
}

interface FacilityMapProps {
  buildings: Building[];
  onBuildingClick: (building: Building) => void;
}

export default function FacilityMap({ buildings, onBuildingClick }: FacilityMapProps) {
  return (
    <div className="relative w-full overflow-hidden bg-card rounded-3xl border-4 border-card shadow-2xl group">
      {/* 
        핵심: <img> 태그를 사용하여 이미지의 자연 비율(aspect ratio)을 유지합니다.
        이미지가 컨테이너 너비에 맞게 스케일되면서도 비율이 유지되므로,
        percentage 기반 top/left 핀 좌표가 모든 해상도에서 정확하게 유지됩니다.
      */}
      <img 
        src="/images/facility_map.png" 
        alt="베들레헴 시설 조감도"
        className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
        draggable={false}
      />

      {/* 이미지 위에 반투명 오버레이 */}
      <div className="absolute inset-0 bg-foreground/10 pointer-events-none" />

      {/* Interactive Pins - 이미지 위에 정확히 오버레이 */}
      {buildings.map((building) => (
        <motion.button
          key={building.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin z-10"
          style={{ top: building.top, left: building.left }}
          onClick={() => onBuildingClick(building)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.2, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            {/* Pulsing effect */}
            <span className="absolute w-full h-full bg-primary/50 rounded-full animate-ping opacity-75"></span>
            
            {/* Pin Icon - 모바일에서 약간 작게 */}
            <div className="relative bg-card text-primary p-2 md:p-3 rounded-full shadow-lg border-2 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors">
                <MapPin size={20} className="md:hidden" fill="currentColor" />
                <MapPin size={28} className="hidden md:block" fill="currentColor" />
            </div>

            {/* Label */}
            <div className="mt-1 md:mt-2 bg-card/90 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-md opacity-0 group-hover/pin:opacity-100 transition-opacity translate-y-2 group-hover/pin:translate-y-0 text-foreground pointer-events-none whitespace-nowrap border border-border">
                {building.name}
            </div>
        </motion.button>
      ))}
      
      {/* 안내 박스 - 모바일에서는 작게 */}
      <div className="absolute bottom-3 right-3 md:bottom-8 md:right-8 bg-card/90 backdrop-blur px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl max-w-[160px] md:max-w-sm border border-border">
        <h3 className="font-bold text-xs md:text-lg mb-0.5 md:mb-1 text-card-foreground">🏗️ 시설 둘러보기</h3>
        <p className="text-[10px] md:text-sm text-muted-foreground leading-tight">
            핀을 클릭하면<br/>내부를 볼 수 있어요.
        </p>
      </div>
    </div>
  );
}
