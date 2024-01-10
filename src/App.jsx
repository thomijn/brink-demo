import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import Model from "./components/Model";
import SelectColor from "./components/SelectColor";

function App() {

  return (
    <>
      <SelectColor />
      <Canvas shadows camera={{ fov: 20, position: [-5, 8, 15] }}>
        <ambientLight intensity={0.5} />
        <group position={[0, -0.5, 0]}>
          <Model rotation={[0, Math.PI * -0.5, 0]} />
          <AccumulativeShadows
            opacity={0.4}
            frames={300}
            scale={20}
            alphaTest={0.7}
            position={[0, -0.5, 0]}
            config={{ mass: 1, tension: 170, friction: 26 }}
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
        <Environment preset="warehouse" />
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </>
  );
}

export default App;
