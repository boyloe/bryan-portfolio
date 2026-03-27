"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Edges } from "@react-three/drei";
import * as THREE from "three";

// Helper: a box with a solid fill AND glowing cyan edges
function GlowBox({
  position,
  size,
  color = "#c8c8de",
  edgeColor = "#00d4ff",
  edgeThreshold = 15,
  opacity = 1,
  emissive = "#000000",
  emissiveIntensity = 0,
  metalness = 0.1,
  roughness = 0.6,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  edgeColor?: string;
  edgeThreshold?: number;
  opacity?: number;
  emissive?: string;
  emissiveIntensity?: number;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        transparent={opacity < 1}
        opacity={opacity}
        metalness={metalness}
        roughness={roughness}
      />
      <Edges threshold={edgeThreshold} color={edgeColor} />
    </mesh>
  );
}

function Road() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[7, 120]} />
      <meshStandardMaterial color="#141420" roughness={1} />
    </mesh>
  );
}

function RoadMarkings() {
  const markings = useMemo(
    () => Array.from({ length: 26 }, (_, i) => -42 + i * 3.5),
    []
  );
  return (
    <>
      {markings.map((z, i) => (
        <mesh key={i} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 1.6]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.9} />
        </mesh>
      ))}
    </>
  );
}

function Terrain({ side }: { side: "left" | "right" }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(22, 120, 14, 32);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, Math.sin(pos.getX(i) * 0.3 + pos.getZ(i) * 0.12) * 0.15 + Math.random() * 0.08);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[side === "left" ? -14 : 14, -0.05, 0]}>
      <meshStandardMaterial color="#0c0c1a" roughness={1} emissive="#060614" emissiveIntensity={0.4} />
    </mesh>
  );
}

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
      mouseX.current * 0.07,
      delta * 1.5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      Math.sin(Date.now() * 0.0007) * 0.04,
      delta * 2
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, -9]} scale={1.5}>

      {/* ── TRUCK CAB ── */}
      <GlowBox position={[-2.0, 0.52, 0]} size={[1.15, 1.05, 1.45]} color="#252535" metalness={0.4} roughness={0.4} />
      {/* Cab roof */}
      <GlowBox position={[-2.0, 1.1, 0]} size={[0.95, 0.22, 1.35]} color="#1e1e2e" metalness={0.3} roughness={0.5} />
      {/* Windshield */}
      <mesh position={[-2.6, 0.62, 0]}>
        <planeGeometry args={[0.55, 0.44]} />
        <meshStandardMaterial color="#88ccff" emissive="#2255aa" emissiveIntensity={0.5} transparent opacity={0.65} />
      </mesh>
      {/* Headlights */}
      {[0.46, -0.46].map((z, i) => (
        <mesh key={i} position={[-2.6, 0.38, z]}>
          <planeGeometry args={[0.2, 0.13]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3.0} />
        </mesh>
      ))}
      <pointLight position={[-3.0, 0.4, 0.45]} color="#ffffff" intensity={2.0} distance={6} />
      <pointLight position={[-3.0, 0.4, -0.45]} color="#ffffff" intensity={2.0} distance={6} />

      {/* Truck wheels */}
      {[-1.55, -2.48].map((x, i) =>
        [0.83, -0.83].map((z, j) => (
          <mesh key={`tw-${i}-${j}`} position={[x, -0.08, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.17, 10]} />
            <meshStandardMaterial color="#111118" roughness={0.95} />
          </mesh>
        ))
      )}
      {/* Hitch */}
      <mesh position={[-0.92, 0.1, 0]}>
        <boxGeometry args={[0.65, 0.08, 0.08]} />
        <meshStandardMaterial color="#aaaabc" metalness={0.9} roughness={0.2} />
        <Edges color="#00d4ff" />
      </mesh>

      {/* ── TRAILER BODY (main white/gray shell) ── */}
      <GlowBox position={[1.1, 0.65, 0]} size={[4.2, 1.3, 1.6]} color="#d8d8e8" edgeColor="#00d4ff" />
      {/* Dark skirt at bottom */}
      <GlowBox position={[1.1, 0.03, 0]} size={[4.22, 0.18, 1.62]} color="#1e1e30" edgeColor="#00d4ff" />
      {/* Roof cap */}
      <GlowBox position={[1.1, 1.33, 0]} size={[4.1, 0.1, 1.55]} color="#ccccdc" edgeColor="#00d4ff" />
      {/* Accent stripe (dark band around mid) */}
      <mesh position={[1.1, 0.95, 0.81]}>
        <planeGeometry args={[4.0, 0.15]} />
        <meshStandardMaterial color="#1a1a3a" emissive="#0a0a28" emissiveIntensity={0.4} />
      </mesh>

      {/* ── SLIDE-OUT ── */}
      <GlowBox position={[0.6, 0.52, -0.94]} size={[1.5, 0.95, 0.25]} color="#ccccdc" edgeColor="#00d4ff" />

      {/* ── WINDOWS ── */}
      {[[-0.3, 0.68], [0.75, 0.68], [1.9, 0.68], [2.75, 0.68]].map(([x, y], i) => (
        <mesh key={`w-${i}`} position={[x, y, 0.81]}>
          <planeGeometry args={[0.48, 0.36]} />
          <meshStandardMaterial color="#66aadd" emissive="#1155aa" emissiveIntensity={0.7} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* ── DOOR ── */}
      <GlowBox position={[2.35, 0.44, 0.82]} size={[0.55, 0.85, 0.04]} color="#bbbbcc" edgeColor="#00d4ff" />
      <mesh position={[2.35, 0.72, 0.845]}>
        <planeGeometry args={[0.32, 0.28]} />
        <meshStandardMaterial color="#66aadd" emissive="#1155aa" emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>

      {/* ── AWNING ── */}
      <mesh position={[2.35, 1.34, 1.22]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.3, 0.05, 0.85]} />
        <meshStandardMaterial color="#224466" roughness={0.7} />
        <Edges color="#00aaff" />
      </mesh>
      {[1.78, 2.9].map((x, i) => (
        <mesh key={`ap-${i}`} position={[x, 0.88, 1.46]}>
          <cylinderGeometry args={[0.025, 0.025, 0.92, 6]} />
          <meshStandardMaterial color="#aaaabc" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* ── TRAILER WHEELS ── */}
      {[0.2, 1.6].map((x, i) =>
        [0.9, -0.9].map((z, j) => (
          <mesh key={`rw-${i}-${j}`} position={[x, -0.08, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.16, 10]} />
            <meshStandardMaterial color="#111118" roughness={0.95} />
          </mesh>
        ))
      )}

      {/* Dedicated lighting so trailer is always visible */}
      <pointLight position={[1.1, 3.5, 3.5]} color="#ffffff" intensity={5.0} distance={10} />
      <pointLight position={[-1.0, 2.0, -2.5]} color="#8899ff" intensity={2.0} distance={8} />
      <pointLight position={[3.5, 1.5, 2.0]} color="#cceeff" intensity={2.5} distance={8} />
    </group>
  );
}

function Scene({
  mouseX,
  mouseY,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  const { camera, scene } = useThree();

  useMemo(() => {
    scene.fog = new THREE.FogExp2("#0a0a0f", 0.018);
  }, [scene]);

  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX.current * -0.5, delta * 1.2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.5 + mouseY.current * 0.1, delta * 1.2);
    camera.lookAt(0.4, 0.65, -9);
  });

  return (
    <>
      <ambientLight intensity={0.8} color="#9999cc" />
      <directionalLight position={[-3, 10, 8]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[6, 4, 2]} intensity={1.0} color="#ccddff" />
      <pointLight position={[0, 0.3, -5]} color="#00d4ff" intensity={1.5} distance={25} />
      <pointLight position={[0, 0.3, -25]} color="#00d4ff" intensity={0.8} distance={30} />

      <Stars radius={120} depth={60} count={3500} factor={3} saturation={0} fade speed={0.3} />
      <Road />
      <RoadMarkings />
      <Terrain side="left" />
      <Terrain side="right" />
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
      camera={{ position: [3.5, 1.5, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
