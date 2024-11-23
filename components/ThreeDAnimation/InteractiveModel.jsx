import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const InteractiveModel = ({ url }) => {
  const model = useGLTF(url);
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={model.scene}
      scale={0.05} // Scale up on hover
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)} // Detect hover
      onPointerOut={() => setHovered(false)} // Detect hover end
      // onClick={() => alert("Model clicked!")} // Detect clicks
    />
  );
};

export default InteractiveModel;
