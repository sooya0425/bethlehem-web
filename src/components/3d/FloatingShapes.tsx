"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingShapes() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the entire group slowly
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
      {/* Lighting environment for realistic reflections */}
      <Environment preset="city" />

      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={1}
        floatingRange={[-0.5, 0.5]}
      >
        <group ref={meshRef}>
          {/* Main central organic shape - TorusKnot represents connection */}
          <mesh position={[0, 0, 0]}>
            <torusKnotGeometry args={[1.8, 0.5, 128, 32]} />
            <meshStandardMaterial
              color="#ffb74d" // Warm orange/gold
              roughness={0.1}
              metalness={0.2}
              envMapIntensity={1}
            />
          </mesh>

          {/* Decorative floating spheres */}
          <mesh position={[-4, 3, -2]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial
              color="#4fc3f7"
              roughness={0.1}
              metalness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>

          <mesh position={[4.5, -2, -3]}>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial
              color="#81c784"
              roughness={0.1}
              metalness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>

          <mesh position={[2, 4, -5]}>
            <icosahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial color="#ff8a65" roughness={0.2} />
          </mesh>
        </group>
      </Float>

      {/* Supplement lights */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        color="#fff"
      />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#e3f2fd" />
    </>
  );
}
