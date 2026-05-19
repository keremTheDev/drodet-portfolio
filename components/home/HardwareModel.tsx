"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Html, OrbitControls, useGLTF } from "@react-three/drei";
import type { Group } from "three";

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
  const { scene } = useGLTF("/models/esp32.glb");
  const { size } = useThree();

  const modelScene = useMemo(() => scene.clone(), [scene]);
  const modelScale = size.width < 768 ? 0.075 : 0.1;

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

useGLTF.preload("/models/esp32.glb");

export function HardwareModel() {
  return (
    <div className="h-full min-h-[400px] w-full overflow-hidden rounded-brand border border-neutral-border bg-[radial-gradient(circle_at_top,rgba(217,119,87,0.16),transparent_34%),linear-gradient(180deg,rgba(20,20,19,0.03)_0%,rgba(20,20,19,0.08)_100%)]">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.6, 3.8], fov: 45 }}
        className="transform-gpu"
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
