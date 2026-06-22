import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const Starfield = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Parallax interaction variables
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Smoothly interpolate rotation for elegant parallax
    targetRotation.current.x += (mouse.current.y * 0.15 - targetRotation.current.x) * delta * 2;
    targetRotation.current.y += (mouse.current.x * 0.15 - targetRotation.current.y) * delta * 2;
    
    // Combine majestic slow rotation with mouse parallax
    // This gives the feeling of drifting through a massive galaxy
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.02 + targetRotation.current.x;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03 + targetRotation.current.y;
  });

  return (
    <group ref={groupRef}>
      {/* Hyper-realistic Starfield */}
      <Stars 
        radius={100}      // Spread of the stars
        depth={50}        // Depth of the starfield
        count={12000}     // Amount of stars
        factor={5}        // Size factor
        saturation={0.5}  // Slight color variation (blue/orange stars)
        fade={true}       // Faded edges for realism
        speed={1.5}       // Twinkle speed
      />
    </group>
  );
};

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#000000]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Starfield />
        </Suspense>
      </Canvas>
      {/* Subtle vignettes and noise overlays for cinematic depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_100%)] z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 z-20 mix-blend-overlay" />
    </div>
  );
};
