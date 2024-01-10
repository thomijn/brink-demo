import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  AccumulativeShadows,
  RandomizedLight,
  Backdrop,
  Lightformer,
} from "@react-three/drei";
import Model from "./Model";
import * as THREE from "three";
function App() {
  return (
    <Canvas shadows camera={{ fov: 20, position: [-5, 8, 15] }}>
      <ambientLight intensity={0.5} />
      <group position={[0, -0.5, 0]}>
        {/* <Model rotation={[0, Math.PI * -0.5, 0]} /> */}
        <AccumulativeShadows
          opacity={0.4}
          frames={300}
          scale={20}
          alphaTest={0.7}
          position={[0, -0.5, 0]}
        >
          <RandomizedLight
            amount={4}
            radius={10}
            ambient={0.9}
            position={[-5, 4, 2]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>
      <OrbitControls />
      <Environment preset="warehouse" />
    </Canvas>
  );
}

export default App;
