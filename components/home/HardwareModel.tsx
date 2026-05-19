"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Html, OrbitControls, useGLTF } from "@react-three/drei";
import type { Group } from "three";

const ESP32_MODEL_URL =
  "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/models/esp32.glb";

function LoadingFallback() {
  return (
    <Html center>
      <div className="rounded-full border border-neutral-border bg-white/85 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-slate-light backdrop-blur-sm">
        Model yükleniyor
      </div>
    </Html>
  );
}

function ESP32Model() {
  const groupRef = useRef<Group | null>(null);
  const { scene } = useGLTF(ESP32_MODEL_URL);
  const { size } = useThree();

  const modelScene = useMemo(() => scene.clone(), [scene]);
  const modelScale = size.width < 768 ? 0.065 : 0.09;

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive
          object={modelScene}
          scale={modelScale} // TODO: Adjust this scale value (e.g., 0.1, 0.01, 0.005) depending on the true export size of your .glb file.
        />
      </Center>
    </group>
  );
}

useGLTF.preload(ESP32_MODEL_URL);

export function HardwareModel() {
  return (
    <div className="relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded-brand border border-[#1414131A] bg-[#1414130A] md:h-[450px]">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.6, 3.8], fov: 45 }}
        className="absolute inset-0 h-full w-full transform-gpu outline-none"
      >
        <ambientLight intensity={1} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4, 3, 4]} intensity={18} color="#d97757" />

        <Suspense fallback={<LoadingFallback />}>
          <ESP32Model />
        </Suspense>

        <OrbitControls enableZoom={false} autoRotate={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
