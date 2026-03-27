"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// Low-poly road stretching to horizon
function Road() {
  const roadGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(4, 40, 1, 1);
    return geo;
  }, []);

  return (
    <mesh geometry={roadGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 5]}>
      <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
    </mesh>
  );
}

// Road center line dashes
function RoadMarkings() {
  const markings = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 12; i++) {
      positions.push(i * 3 - 4);
    }
    return positions;
  }, []);

  return (
    <>
      {markings.map((z, i) => (
        <mesh key={i} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.06, 1.2]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </>
  );
}

// Low-poly terrain on sides
function Terrain({ side }: { side: "left" | "right" }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(10, 40, 8, 20);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, Math.sin(x * 0.4 + z * 0.2) * 0.4 + Math.random() * 0.3);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const x = side === "left" ? -7 : 7;

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.1, 5]}>
      <meshStandardMaterial
        color="#0d0d1a"
        wireframe={false}
        roughness={1}
        emissive="#0a0a2a"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Stylized low-poly travel trailer
function TravelTrailer({ mouseX, mouseY }: { mouseX: React.MutableRefObject<number>; mouseY: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle floating + mouse parallax
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX.current * 0.15,
      delta * 2
    );
    groupRef.current.position.y = -0.2 + Math.sin(Date.now() * 0.001) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 2]}>
      {/* Trailer body */}
      <mesh position={[0.6, 0.35, 0]}>
        <boxGeometry args={[2.4, 0.7, 0.9]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.3} emissive="#0a0a1e" emissiveIntensity={0.2} />
      </mesh>
      {/* Trailer roof */}
      <mesh position={[0.6, 0.76, 0]}>
        <boxGeometry args={[2.2, 0.12, 0.85]} />
        <meshStandardMaterial color="#12121a" roughness={0.7} />
      </mesh>
      {/* Window glow */}
      <mesh position={[0.8, 0.35, 0.46]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.2, 0.35, 0.46]}>
        <planeGeometry args={[0.3, 0.25]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.6} transparent opacity={0.5} />
      </mesh>
      {/* Trailer hitch/tongue */}
      <mesh position={[-0.95, 0.1, 0]}>
        <boxGeometry args={[0.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#8888a0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Wheels */}
      {[-0.3, 0.9].map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.05, 0.47]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 8]} />
            <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
          </mesh>
          <mesh position={[x, -0.05, -0.47]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 8]} />
            <meshStandardMaterial color="#0a0a0f" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {/* Truck cab */}
      <mesh position={[-1.1, 0.28, 0]}>
        <boxGeometry args={[0.8, 0.56, 0.85]} />
        <meshStandardMaterial color="#12121a" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[-1.1, 0.58, 0]}>
        <boxGeometry args={[0.65, 0.22, 0.8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
      </mesh>
      {/* Headlights */}
      <pointLight position={[-1.55, 0.28, 0.3]} color="#00d4ff" intensity={0.4} distance={3} />
      <pointLight position={[-1.55, 0.28, -0.3]} color="#00d4ff" intensity={0.4} distance={3} />
    </group>
  );
}

// Cyan grid on ground
function GroundGrid() {
  return (
    <gridHelper args={[40, 40, "#00d4ff", "#0a1a2e"]} position={[0, -0.5, 5]}>
      <meshStandardMaterial transparent opacity={0.15} />
    </gridHelper>
  );
}

function Scene({ mouseX, mouseY }: { mouseX: React.MutableRefObject<number>; mouseY: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX.current * -0.3, delta * 1.5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.8 + mouseY.current * 0.2, delta * 1.5);
    camera.lookAt(0, 0, 2);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 2, -5]} intensity={0.8} color="#00d4ff" distance={20} />
      <Stars radius={80} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
      <Road />
      <RoadMarkings />
      <Terrain side="left" />
      <Terrain side="right" />
      <GroundGrid />
      <TravelTrailer mouseX={mouseX} mouseY={mouseY} />
      {/* Distant horizon glow */}
      <mesh position={[0, 0, -18]}>
        <planeGeometry args={[30, 4]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.05} transparent opacity={0.03} />
      </mesh>
    </>
  );
}

export default function HeroScene({ mouseX, mouseY }: { mouseX: React.MutableRefObject<number>; mouseY: React.MutableRefObject<number> }) {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0.8, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
