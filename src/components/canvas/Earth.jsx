import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  useMemo(() => {
    // Traverse the scene to find any meshes with invalid geometry
    earth.scene.traverse((child) => {
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
  }, [earth]);

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
