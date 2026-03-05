'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import PhotoGallery3D from './3d/PhotoGallery3D';

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      {/* className assumes parent has relative positioning */}
      <Canvas 
        className="w-full h-full"
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]} 
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <PhotoGallery3D />
        </Suspense>
      </Canvas>
    </div>
  );
}
