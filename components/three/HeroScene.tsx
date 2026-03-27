"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function Road() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[7, 120]} />
      <meshStandardMaterial color="#18182a" roughness={0.95} />
    </mesh>
  );
}

function RoadMarkings() {
  const markings = useMemo(
    () => Array.from({ length: 24 }, (_, i) => -40 + i * 3.5),
    []
  );
  return (
    <>
      {markings.map((z, i) => (
        <mesh key={i} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 1.5]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </>
  );
}

function Terrain({ side }: { side: "left" | "right" }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(20, 120, 12, 30);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, Math.sin(x * 0.25 + z * 0.12) * 0.18 + Math.random() * 0.1);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const x = side === "left" ? -13 : 13;
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.05, 0]}>
      <meshStandardMaterial color="#0d0d1c" roughness={1} emissive="#08081a" emissiveIntensity={0.5} />
    </mesh>
  );
}

// Salem-style travel trailer — white/gray, boxy, with slide-out and awning
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
      mouseX.current * 0.08,
      delta * 1.5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      Math.sin(Date.now() * 0.0007) * 0.04,
      delta * 2
    );
  });

  return (
    <group ref={groupRef} position={[0.4, 0, -10]} scale={1.4}>

      {/* === TRUCK CAB (dark, facing camera-left) === */}
      {/* Main cab body */}
      <mesh position={[-2.1, 0.5, 0]}>
        <boxGeometry args={[1.2, 1.0, 1.4]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.4} metalness={0.4} />
      </mesh>
      {/* Cab roof */}
      <mesh position={[-2.1, 1.08, 0]}>
        <boxGeometry args={[1.0, 0.22, 1.3]} />
        <meshStandardMaterial color="#222230" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Windshield */}
      <mesh position={[-2.72, 0.6, 0]}>
        <planeGeometry args={[0.55, 0.45]} />
        <meshStandardMaterial color="#aaddff" emissive="#4488aa" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>
      {/* Side window */}
      <mesh position={[-1.8, 0.62, 0.72]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.4, 0.32]} />
        <meshStandardMaterial color="#aaddff" emissive="#4488aa" emissiveIntensity={0.2} transparent opacity={0.5} />
      </mesh>
      {/* Headlights */}
      <mesh position={[-2.72, 0.38, 0.42]}>
        <planeGeometry args={[0.18, 0.12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
      </mesh>
      <mesh position={[-2.72, 0.38, -0.42]}>
        <planeGeometry args={[0.18, 0.12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
      </mesh>
      {/* Headlight glow */}
      <pointLight position={[-3.0, 0.4, 0.4]} color="#ffffff" intensity={1.5} distance={5} />
      <pointLight position={[-3.0, 0.4, -0.4]} color="#ffffff" intensity={1.5} distance={5} />
      {/* Truck wheels */}
      {[-1.6, -2.55].map((x, i) =>
        [0.78, -0.78].map((z, j) => (
          <group key={`tw-${i}-${j}`}>
            <mesh position={[x, -0.08, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.18, 10]} />
              <meshStandardMaterial color="#111118" roughness={0.95} />
            </mesh>
            <mesh position={[x, -0.08, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.2, 8]} />
              <meshStandardMaterial color="#888899" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))
      )}
      {/* Hitch */}
      <mesh position={[-0.98, 0.1, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.08]} />
        <meshStandardMaterial color="#999aaa" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* === TRAILER BODY === */}
      {/* Main white/gray body */}
      <mesh position={[1.2, 0.62, 0]}>
        <boxGeometry args={[4.0, 1.25, 1.5]} />
        <meshStandardMaterial color="#dcdce8" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Dark lower skirt stripe */}
      <mesh position={[1.2, 0.02, 0]}>
        <boxGeometry args={[4.02, 0.2, 1.52]} />
        <meshStandardMaterial color="#222233" roughness={0.7} />
      </mesh>
      {/* Accent stripe (Salem-style dark stripe) */}
      <mesh position={[1.2, 1.1, 0.76]}>
        <planeGeometry args={[3.8, 0.18]} />
        <meshStandardMaterial color="#1a1a3a" roughness={0.5} />
      </mesh>
      {/* Roof */}
      <mesh position={[1.2, 1.28, 0]}>
        <boxGeometry args={[4.0, 0.1, 1.48]} />
        <meshStandardMaterial color="#c8c8d8" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Front cap (curved look via angled face) */}
      <mesh position={[-0.82, 0.62, 0]}>
        <boxGeometry args={[0.08, 1.25, 1.5]} />
        <meshStandardMaterial color="#c8c8d8" roughness={0.6} />
      </mesh>

      {/* === SLIDE-OUT (right side) === */}
      <mesh position={[0.8, 0.5, -0.9]}>
        <boxGeometry args={[1.4, 0.9, 0.22]} />
        <meshStandardMaterial color="#d0d0de" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Slide-out bottom */}
      <mesh position={[0.8, 0.07, -0.9]}>
        <boxGeometry args={[1.42, 0.12, 0.22]} />
        <meshStandardMaterial color="#999aaa" roughness={0.6} />
      </mesh>

      {/* === WINDOWS (front/visible side) === */}
      {[[-0.2, 0.65], [0.8, 0.65], [1.9, 0.65], [2.7, 0.65]].map(([x, y], i) => (
        <mesh key={`win-${i}`} position={[x, y, 0.76]}>
          <planeGeometry args={[0.45, 0.35]} />
          <meshStandardMaterial
            color="#88ccee"
            emissive="#2266aa"
            emissiveIntensity={0.5}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}

      {/* === DOOR === */}
      <mesh position={[2.4, 0.42, 0.77]}>
        <planeGeometry args={[0.55, 0.82]} />
        <meshStandardMaterial color="#bbbbcc" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Door window */}
      <mesh position={[2.4, 0.72, 0.775]}>
        <planeGeometry args={[0.32, 0.28]} />
        <meshStandardMaterial color="#88ccee" emissive="#2266aa" emissiveIntensity={0.4} transparent opacity={0.7} />
      </mesh>
      {/* Door handle */}
      <mesh position={[2.22, 0.42, 0.78]}>
        <boxGeometry args={[0.04, 0.12, 0.04]} />
        <meshStandardMaterial color="#888899" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* === AWNING (extends over door) === */}
      <mesh position={[2.4, 1.28, 1.1]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.8]} />
        <meshStandardMaterial color="#336688" roughness={0.7} transparent opacity={0.9} />
      </mesh>
      {/* Awning support poles */}
      {[1.9, 2.9].map((x, i) => (
        <mesh key={`aw-${i}`} position={[x, 0.9, 1.42]}>
          <cylinderGeometry args={[0.025, 0.025, 0.8, 6]} />
          <meshStandardMaterial color="#888899" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* === TRAILER WHEELS === */}
      {[0.3, 1.5].map((x, i) =>
        [0.84, -0.84].map((z, j) => (
          <group key={`rw-${i}-${j}`}>
            <mesh position={[x, -0.07, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.16, 10]} />
              <meshStandardMaterial color="#111118" roughness={0.95} />
            </mesh>
            <mesh position={[x, -0.07, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.18, 8]} />
              <meshStandardMaterial color="#888899" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))
      )}

      {/* === JACKS (front stabilizers) === */}
      {[-0.5, 2.9].map((x, i) =>
        [0.6, -0.6].map((z, j) => (
          <mesh key={`jack-${i}-${j}`} position={[x, -0.22, z]}>
            <cylinderGeometry args={[0.04, 0.04, 0.48, 6]} />
            <meshStandardMaterial color="#888899" metalness={0.6} roughness={0.4} />
          </mesh>
        ))
      )}

      {/* Lighting on trailer for visibility */}
      <pointLight position={[1.2, 2.5, 2]} color="#e8eeff" intensity={3.0} distance={8} />
      <pointLight position={[1.2, 1.5, -2]} color="#aabbff" intensity={1.5} distance={6} />
    </group>
  );
}

function HorizonGlow() {
  return (
    <>
      <mesh position={[0, 0.3, -40]}>
        <planeGeometry args={[50, 5]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.1} transparent opacity={0.05} />
      </mesh>
      {/* Road vanishing point glow */}
      <pointLight position={[0, 0.2, -30]} color="#00d4ff" intensity={0.8} distance={35} />
    </>
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
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX.current * -0.5, delta * 1.2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.6 + mouseY.current * 0.1, delta * 1.2);
    camera.lookAt(0.4, 0.6, -10);
  });

  return (
    <>
      {/* Key light — bright from upper left */}
      <directionalLight position={[-4, 8, 6]} intensity={2.5} color="#ffffff" castShadow />
      {/* Fill light — right side */}
      <directionalLight position={[6, 4, 2]} intensity={1.2} color="#cce0ff" />
      {/* Ambient — lifts the shadows */}
      <ambientLight intensity={1.0} color="#8899cc" />
      {/* Road glow */}
      <pointLight position={[0, 0.3, -6]} color="#00d4ff" intensity={1.2} distance={20} />

      <Stars radius={120} depth={60} count={3500} factor={3} saturation={0} fade speed={0.3} />
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
      camera={{ position: [3, 1.6, 5], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
