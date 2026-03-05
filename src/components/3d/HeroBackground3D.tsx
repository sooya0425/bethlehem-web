"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   1. Floating Particles — 부드럽게 떠다니는 빛나는 파티클
   ────────────────────────────────────────────── */
function Particles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 0.08 + 0.02;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#a78bfa"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────
   2. Floating Blob — 유기적으로 변형되는 그래디언트 구체
   ────────────────────────────────────────────── */
function GradientBlob({
  position,
  color,
  speed = 1,
  distort = 0.4,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y =
      position[1] + Math.sin(t * speed * 0.5) * 0.3;
    meshRef.current.position.x =
      position[0] + Math.cos(t * speed * 0.3) * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={distort}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   3. Wobbling Ring — 부드럽게 흔들리는 링 도형
   ────────────────────────────────────────────── */
function WobblingRing({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.z = t * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.15, 16, 64]} />
        <MeshWobbleMaterial
          color={color}
          speed={1.5}
          factor={0.3}
          transparent
          opacity={0.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   4. Floating Gem — 반짝이는 다면체 보석
   ────────────────────────────────────────────── */
function FloatingGem({
  position,
  color,
  scale = 0.6,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.rotation.z = t * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          metalness={0.8}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   5. Main Hero Background Scene
   ────────────────────────────────────────────── */
export default function HeroBackground3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fef3c7" />
      <pointLight position={[-5, -3, 2]} intensity={0.5} color="#ddd6fe" />
      <pointLight position={[3, 4, -3]} intensity={0.3} color="#bfdbfe" />

      {/* Gradient Blobs — 따뜻하고 입체감 있는 유기적 구체들 */}
      <GradientBlob position={[-3.5, 1.5, -4]} color="#c4b5fd" speed={0.8} distort={0.5} scale={2.2} />
      <GradientBlob position={[4, -1, -6]} color="#93c5fd" speed={0.6} distort={0.35} scale={1.8} />
      <GradientBlob position={[0, -2.5, -3]} color="#fda4af" speed={1} distort={0.45} scale={1.5} />
      <GradientBlob position={[-1.5, 3, -8]} color="#a7f3d0" speed={0.5} distort={0.3} scale={2.5} />

      {/* Wobbling Rings — 은은하게 흔들리는 링 */}
      <WobblingRing position={[5, 2, -5]} color="#ddd6fe" scale={1.2} />
      <WobblingRing position={[-4.5, -2, -7]} color="#bae6fd" scale={0.9} />

      {/* Floating Gems — 반짝이는 보석 */}
      <FloatingGem position={[2.5, 3.5, -3]} color="#f9a8d4" scale={0.5} />
      <FloatingGem position={[-3, -3, -2]} color="#a78bfa" scale={0.4} />
      <FloatingGem position={[5.5, -2.5, -4]} color="#67e8f9" scale={0.35} />

      {/* Particles */}
      <Particles count={300} />
    </>
  );
}
