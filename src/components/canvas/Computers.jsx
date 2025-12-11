import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  useMemo(() => {
    // Traverse the scene to find any meshes with invalid geometry
    computer.scene.traverse((child) => {
      if (child.isMesh) {
        const geometry = child.geometry;
        if (geometry && geometry.attributes && geometry.attributes.position) {
          const positions = geometry.attributes.position.array;
          let hasNaN = false;
          // Check for NaN in position attribute
          for (let i = 0; i < positions.length; i++) {
            if (isNaN(positions[i])) {
              hasNaN = true;
              break;
            }
          }

          if (hasNaN) {
            console.warn(`Cleaned up mesh with NaN positions: ${child.name}`);
            // Replace the corrupted attribute with valid zeros
            const safePositions = new Float32Array(positions.length).fill(0);
            geometry.setAttribute('position', new THREE.BufferAttribute(safePositions, 3));
            
            // Recompute bounding sphere with safe data
            geometry.computeBoundingSphere();

            // Still hide it because the data is garbage
            child.visible = false;
          } else {
             // Ensure bounding sphere is computed if it wasn't
             geometry.computeBoundingSphere();
          }
        }
      }
    });
  }, [computer]);

  return (
    <mesh>
      <hemisphereLight intensity={1.3} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        // Adjusted scale for mobile to be slightly larger and easier to see
        scale={isMobile ? 0.35 : 0.75}
        // Adjusted mobile position:
        // [0, -1.5, -1.0] -> Moves it UP (from -3 to -1.5) and centers it horizontally (tweaking Z axis)
        position={isMobile ? [0, -1.5, -0.5] : [0, -2.75, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;