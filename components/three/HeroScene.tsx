"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// Flat road plane stretching to horizon
function Road() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[6, 80]} />
      <meshStandardMaterial color="#111122" roughness={0.95} />
    </mesh>
  );
}

// Dashed center line
function RoadMarkings() {
  const markings = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => -30 + i * 3.5);
  }, []);

  return (
    <>
      {markings.map((z, i) => (
        <mesh key={i} position={[0, 0.005, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 1.4]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </>
  );
}

// Low flat terrain on sides — stays below camera horizon
function Terrain({ side }: { side: "left" | "right" }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(16, 80, 10, 24);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Keep terrain very flat, slight undulation
      pos.setY(i, Math.sin(x * 0.3 + z * 0.15) * 0.2 + Math.random() * 0.15);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const x = side === "left" ? -11 : 11;

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.05, 0]}>
      <meshStandardMaterial
        color="#0d0d1a"
        roughness={1}
        emissive="#06061a"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// Travel trailer — positioned further back on the road
function TravelTrailer({
  mouseX,
  mouseY,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX.current * 0.1,
      delta * 1.5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      0 + Math.sin(Date.now() * 0.0008) * 0.03,
      delta * 2
    );
  });

  return (
    // Positioned further down the road so it doesn't block text
    <group ref={groupRef} position={[0, 0, -12]} scale={1.3}>
      {/* Truck cab */}
      <mesh position={[-1.3, 0.38, 0]}>
        <boxGeometry args={[1.0, 0.75, 1.1]} />
        <meshStandardMaterial
          color="#1a1a30"
          roughness={0.5}
          metalness={0.3}
          emissive="#0a0a20"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Cab roof */}
      <mesh position={[-1.3, 0.82, 0]}>
        <boxGeometry args={[0.8, 0.2, 1.0]} />
        <meshStandardMaterial color="#12122a" roughness={0.6} />
      </mesh>
      {/* Windshield glow */}
      <mesh position={[-1.82, 0.55, 0]}>
        <planeGeometry args={[0.5, 0.35]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Trailer body */}
      <mesh position={[0.8, 0.42, 0]}>
        <boxGeometry args={[3.0, 0.85, 1.1]} />
        <meshStandardMaterial
          color="#16162e"
          roughness={0.6}
          metalness={0.2}
          emissive="#0a0a1e"
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Trailer roof */}
      <mesh position={[0.8, 0.9, 0]}>
        <boxGeometry args={[2.8, 0.1, 1.05]} />
        <meshStandardMaterial color="#0e0e22" roughness={0.8} />
      </mesh>

      {/* Trailer windows — glowing */}
      <mesh position={[1.2, 0.45, 0.56]}>
        <planeGeometry args={[0.55, 0.3]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[0.3, 0.45, 0.56]}>
        <planeGeometry args={[0.35, 0.25]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#00aaff"
          emissiveIntensity={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Hitch */}
      <mesh position={[-0.85, 0.12, 0]}>
        <boxGeometry args={[0.55, 0.07, 0.07]} />
        <meshStandardMaterial color="#888899" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      {[-0.1, 1.4].map((x, i) => (
        <group key={i}>
          {[0.58, -0.58].map((z, j) => (
            <mesh key={j} position={[x, -0.1, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.22, 0.12, 8]} />
              <meshStandardMaterial color="#0a0a14" roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Headlights casting forward */}
      <pointLight
        position={[-1.9, 0.4, 0.4]}
        color="#00d4ff"
        intensity={1.5}
        distance={8}
      />
      <pointLight
        position={[-1.9, 0.4, -0.4]}
        color="#00d4ff"
        intensity={1.5}
        distance={8}
      />
    </group>
  );
}

// Subtle cyan horizon glow
function HorizonGlow() {
  return (
    <mesh position={[0, 0.5, -35]}>
      <planeGeometry args={[40, 6]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.08}
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

function Scene({
  mouseX,
  mouseY,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    // Gentle camera drift with mouse
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseX.current * -0.4,
      delta * 1.2
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      1.8 + mouseY.current * 0.15,
      delta * 1.2
    );
    camera.lookAt(0, 0.5, -20);
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#1a1a3a" />
      <directionalLight position={[0, 8, 10]} intensity={0.4} color="#8888ff" />
      {/* Road centerline glow light */}
      <pointLight position={[0, 0.5, -8]} color="#00d4ff" intensity={1.0} distance={25} />
      <pointLight position={[0, 0.5, -20]} color="#00d4ff" intensity={0.6} distance={20} />

      {/* Stars */}
      <Stars
        radius={120}
        depth={60}
        count={3000}
        factor={3}
        saturation={0}
        fade
        speed={0.3}
      />

      <Road />
      <RoadMarkings />
      <Terrain side="left" />
      <Terrain side="right" />
      <HorizonGlow />
      <TravelTrailer mouseX={mouseX} mouseY={mouseY} />
    </>
  );
}

export default function HeroScene({
  mouseX,
  mouseY,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 1.8, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
