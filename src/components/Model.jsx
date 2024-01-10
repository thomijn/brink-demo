import React from "react";
import {
    useGLTF,
    useTexture,
} from "@react-three/drei";
import { configOptions } from "../constants";
import useStore from "../store";
import { motion as threeMotion } from 'framer-motion-3d'
import HotSpot from "./HotSpot";

function Model(props) {
    const { nodes } = useGLTF("/brink-demo.glb");
    const texture = useTexture("/bake-test.jpg");
    texture.flipY = false;

    const selectedColors = useStore((state) => state.selectedColors);

    return (
        <group {...props} dispose={null}>
            {configOptions.map((option) => {
                const color = selectedColors.find((c) => c.id === option.id).color;
                return (
                    <group key={option.id}>
                        {option.tagPosition && (
                            <HotSpot
                                option={option}
                                position={option.tagPosition}
                            />
                        )}
                        <mesh castShadow receiveShadow geometry={nodes[option.id].geometry}>
                            {option.glassPanel ? (
                                <meshPhysicalMaterial
                                    transmission={0}
                                    color={color?.colorThree || color}
                                    roughness={0.1}
                                    metalness={0.1}
                                />
                            ) : (
                                <threeMotion.meshBasicMaterial
                                    animate={{ color: color?.colorThree || color }}
                                    map={texture}
                                    map-flipY={false}
                                />
                            )}
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

useGLTF.preload("/brink-demo.glb");

export default Model;
