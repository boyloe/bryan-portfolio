"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const DASH_COUNT = 22;
const DASH_SPACING = 10;
const SPEED = 26;

function AnimatedDashes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const positions = useRef(
    Array.from({ length: DASH_COUNT }, (_, i) => -i * DASH_SPACING)
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    positions.current = positions.current.map((z) => {
      const nz = z + delta * SPEED;
      return nz > 5 ? nz - DASH_COUNT * DASH_SPACING : nz;
    });
    positions.current.forEach((z, i) => {
      dummy.position.set(0, 0.01, z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, DASH_COUNT]}>
      <planeGeometry args={[0.1, 3]} />
      <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2.2} />
    </instancedMesh>
  );
}

function buildTerrain() {
  const g = new THREE.PlaneGeometry(44, 270, 20, 60);
  const pos = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(
      i,
      Math.sin(pos.getX(i) * 0.18 + pos.getZ(i) * 0.09) * 0.4 +
        (Math.random() - 0.5) * 0.2
    );
  }
  g.computeVertexNormals();
  return g;
}

function Scene({
  mouseX,
  mouseY,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  const { camera, scene } = useThree();
  const terrainL = useMemo(() => buildTerrain(), []);
  const terrainR = useMemo(() => buildTerrain(), []);

  useMemo(() => {
    scene.fog = new THREE.FogExp2("#07070d", 0.007);
  }, [scene]);

  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseX.current * -1.0,
      delta * 1.8
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      1.1 + mouseY.current * 0.2,
      delta * 1.8
    );
    (camera as THREE.PerspectiveCamera).lookAt(
      mouseX.current * 2.5,
      0.55,
      -220
    );
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#223355" />
      <pointLight position={[0, 1, -35]} color="#00d4ff" intensity={4} distance={90} />
      <pointLight position={[0, 1, -120]} color="#0066cc" intensity={2} distance={120} />

      <Stars radius={220} depth={100} count={5500} factor={3} saturation={0} fade speed={0.15} />

      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -110]}>
        <planeGeometry args={[13, 270]} />
        <meshStandardMaterial color="#0a0a16" roughness={1} />
      </mesh>

      {/* Road edge lines */}
      {[-4.2, 4.2].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.005, -110]}>
          <planeGeometry args={[0.07, 270]} />
          <meshStandardMaterial
            color="#cccccc"
            emissive="#cccccc"
            emissiveIntensity={0.3}
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}

      <AnimatedDashes />

      {/* Terrain left */}
      <mesh geometry={terrainL} rotation={[-Math.PI / 2, 0, 0]} position={[-28, -0.05, -110]}>
        <meshStandardMaterial color="#050510" roughness={1} />
      </mesh>

      {/* Terrain right */}
      <mesh geometry={terrainR} rotation={[-Math.PI / 2, 0, 0]} position={[28, -0.05, -110]}>
        <meshStandardMaterial color="#050510" roughness={1} />
      </mesh>

      {/* Horizon glow */}
      <mesh position={[0, 1.2, -200]}>
        <planeGeometry args={[80, 12]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.08}
          transparent
          opacity={0.06}
        />
      </mesh>
    </>
  );
}

export default function HeroSceneA({
  mouseX,
  mouseY,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 1.1, 3], fov: 72, near: 0.1, far: 500 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
