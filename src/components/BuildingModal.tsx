"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Building } from "./FacilityMap";

interface BuildingModalProps {
  building: Building | null;
  onClose: () => void;
}

export default function BuildingModal({ building, onClose }: BuildingModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index when building changes
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [building]);

  if (!building) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === building.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? building.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {building && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card dark:bg-card border border-border rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Image Slider Section */}
              <div className="relative w-full md:w-2/3 h-64 md:h-auto bg-muted group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={building.images[currentImageIndex]}
                        alt={`${building.name} view ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                {building.images.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md transition-all text-white opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md transition-all text-white opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight size={24} />
                        </button>
                        
                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {building.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        idx === currentImageIndex ? "w-6 bg-white" : "bg-white/50 hover:bg-white/80"
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
              </div>

              {/* Info Section */}
              <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col relative bg-card text-card-foreground">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors z-10"
                >
                    <X size={24} className="text-muted-foreground" />
                </button>

                <div className="mt-2 md:mt-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                        <Info size={14} />
                        시설 상세정보
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-foreground">{building.name}</h2>
                    <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
                    
                    <p className="text-muted-foreground leading-relaxed text-lg mb-8 grow overflow-y-auto">
                        {building.description}
                    </p>

                    <div className="mt-auto">
                        <div className="text-sm text-muted-foreground">
                            사진 {currentImageIndex + 1} / {building.images.length}
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
