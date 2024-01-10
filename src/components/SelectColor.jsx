import { colorOptions, glassColorOptions } from "../constants"
import useStore from "../store"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "react-feather"

const MotionX = motion(X)

const SelectColor = () => {
    const active = useStore((state) => state.active)
    const setActive = useStore((state) => state.setActive)
    const selectedColors = useStore((state) => state.selectedColors)
    const setSelectedColors = useStore((state) => state.setSelectedColors)

    if (!active) return null

    const OptionsToBeShown = active.glassPanel ? glassColorOptions : colorOptions

    return (
        <motion.div
            layout='scale'
            layoutId="outline"
            transition={{
                layout: {
                    delay: active.glassPanel ? 0.5 : 0,
                    easing: [0.43, 0.13, 0.23, 0.96],
                },
            }}
            initial={{ opacity: 0 }}
            style={{ borderRadius: '3px' }}
            animate={{ opacity: active ? 1 : 0 }}
            className="config-wrapper">
            <AnimatePresence
                mode="wait"

            >
                <motion.span layout='position' key={active.label} style={{ overflow: 'hidden', position: 'relative', display: 'block' }}>
                    <motion.h2
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        exit={{ y: -20 }}
                        transition={{
                            easing: [0.43, 0.13, 0.23, 0.96],
                            duration: 0.2,
                        }}
                        layout='position'>{active.label}</motion.h2>
                </motion.span>
            </AnimatePresence>
            <div className="colors-wrapper">
                <AnimatePresence mode="popLayout">
                    {
                        OptionsToBeShown.map((color, index) => {
                            const isActiveColor = selectedColors.find(
                                (s) => s.id === active.id && s.color.color === color.color
                            )

                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{
                                        delay: 0.05 * index,
                                        easing: [0.43, 0.13, 0.23, 0.96],
                                    }}
                                    layout
                                    key={index}
                                    className="color"
                                    style={{ backgroundColor: color.color }}
                                    onClick={() => {
                                        const newColors = selectedColors.map((s) => {
                                            if (s.id === active.id) {
                                                return {
                                                    ...s,
                                                    color: color,
                                                }
                                            }
                                            return s
                                        })
                                        setSelectedColors(newColors)
                                    }}
                                >
                                    {isActiveColor && (
                                        <motion.div
                                            key={index}
                                            layoutId="selected"
                                            className="selected" />
                                    )}
                                </motion.div>
                            )
                        })
                    }
                </AnimatePresence>
                <MotionX
                    // layout='position'
                    className="close"
                    onClick={() => setActive(null)}
                />
            </div>
        </motion.div >
    )
}

export default SelectColor