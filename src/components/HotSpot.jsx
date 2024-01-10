import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import useStore from "../store";


const HotSpot = ({ position, option }) => {
    const [hovered, setHovered] = useState(false);
    const [hidden, set] = useState()
    const setActive = useStore((state) => state.setActive);

    return (
        <Html
            occlude
            zIndexRange={[100, 0]}
            onOcclude={set}
            position={position}
            geometry={
                <circleBufferGeometry args={[0.5, 32]} />
            }
        >
            <motion.div
                onClick={() => setActive(option)}
                transition={{ duration: 0.2 }}
                animate={{
                    scale: hidden ? 0 : hovered ? 1.2 : 1,
                    opacity: hidden ? 0 : 1,
                    width: hovered ? 160 : 40,
                }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                className="tag"
            >
                {hovered && (
                    <motion.span
                        transition={{ delay: hovered ? 0.1 : 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        className="tag-label">{option.label}</motion.span>
                )}
            </motion.div>
        </Html>
    );
};

export default HotSpot;