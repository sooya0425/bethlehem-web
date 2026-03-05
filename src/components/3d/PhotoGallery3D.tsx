"use client";

import { useRef, useMemo, Suspense } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// 로컬 이미지 경로 (public/images 폴더)
const PHOTOS = [
  "/images/photo_gallery_1.png",
  "/images/photo_gallery_2.png",
  "/images/photo_gallery_3.png",
  "/images/photo_gallery_4.png",
  "/images/photo_gallery_5.png",
  "/images/photo_gallery_6.png",
];

function PhotoItem({
  texture,
  position,
  scale,
  rotation,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number];
  rotation: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // 마우스 위치에 따른 미세한 각도 변화 (시선 추적 / 패럴랙스)
      const x = (state.mouse.x * Math.PI) / 20;
      const y = (state.mouse.y * Math.PI) / 20;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        x + rotation[1],
        0.05,
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -y + rotation[0],
        0.05,
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

function Gallery() {
  const { width, height } = useThree((state) => state.viewport);

  // Three.js TextureLoader를 사용하여 로컬 이미지 로드
  const textures = useLoader(THREE.TextureLoader, PHOTOS);

  // 화면 크기에 비례하여 사진들 배치 좌표 계산
  const layout = useMemo(
    () => [
      {
        idx: 0,
        pos: [-width * 0.3, height * 0.15, 0] as [number, number, number],
        scale: [width * 0.22, width * 0.3] as [number, number],
        rot: [0, 0.15, 0] as [number, number, number],
      },
      {
        idx: 1,
        pos: [width * 0.32, height * 0.1, -2] as [number, number, number],
        scale: [width * 0.28, width * 0.18] as [number, number],
        rot: [0, -0.1, 0] as [number, number, number],
      },
      {
        idx: 2,
        pos: [-width * 0.05, -height * 0.22, -1] as [number, number, number],
        scale: [width * 0.18, width * 0.22] as [number, number],
        rot: [0.05, 0, 0] as [number, number, number],
      },
      {
        idx: 3,
        pos: [width * 0.12, -height * 0.28, 1] as [number, number, number],
        scale: [width * 0.22, width * 0.18] as [number, number],
        rot: [-0.05, 0.1, 0] as [number, number, number],
      },
      {
        idx: 4,
        pos: [-width * 0.38, -height * 0.08, -3] as [number, number, number],
        scale: [width * 0.18, width * 0.26] as [number, number],
        rot: [0, 0.2, 0] as [number, number, number],
      },
      {
        idx: 5,
        pos: [width * 0.4, height * 0.3, -4] as [number, number, number],
        scale: [width * 0.18, width * 0.14] as [number, number],
        rot: [0, -0.2, 0] as [number, number, number],
      },
    ],
    [width, height],
  );

  return (
    <group>
      {layout.map((item, i) => (
        <PhotoItem
          key={i}
          texture={textures[item.idx]}
          position={item.pos}
          scale={item.scale}
          rotation={item.rot}
        />
      ))}
      <ambientLight intensity={1.2} />
    </group>
  );
}

export default function PhotoGallery3D() {
  return (
    <Suspense fallback={null}>
      <Gallery />
    </Suspense>
  );
}
