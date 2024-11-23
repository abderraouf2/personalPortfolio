import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InteractiveModel from "./InteractiveModel";

export default function ThreeDModel() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [5, -2, 5], fov: 70 }}>
        {/* Add lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[0.5, 5, 5]} />

        {/* Add the 3D model */}
        <InteractiveModel url="/assets/logo.glb" />

        {/* Orbit controls for interactivity */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
