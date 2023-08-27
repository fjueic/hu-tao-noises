import SliderComp from "../../components/Slider/Slider";
import React, { useEffect, useState } from "react";
import { LuSettings } from "react-icons/lu";
import { motion } from "framer-motion";
import { AnimatePresence, useAnimationControls } from "framer-motion";
import "./Settings.css";
const Settings = ({ open, setOpen, duration, setDuration }) => {
    const [isHovering, setIsHovering] = useState(false);
    const settingsIconControls = useAnimationControls();
    const [iconIsHovering, setIconIsHovering] = useState(false);
    useEffect(() => {
        if (open) {
            settingsIconControls.start({
                translateY: "calc(25vh - 1.5vh)",
                translateX: "calc(25vw - 1.5vh)",
            });
        } else {
            settingsIconControls.start({
                translateX: 0,
                translateY: 0,
            });
        }
    }, [open]);
    return (
        <div className="settings">
            <motion.div
                onClick={() => setOpen((prev) => !prev)}
                className={`settings-icon ${open ? "active" : ""} ${
                    iconIsHovering ? "hovering" : ""
                }`}
                animate={settingsIconControls}
                transition={{
                    type: "easeInOut",
                }}
                onMouseEnter={() => setIconIsHovering(true)}
                onMouseLeave={() => setIconIsHovering(false)}
            >
                <span></span>
                <span></span>
                <span></span>
            </motion.div>
            <AnimatePresence initial={false} mode="wait">
                {open && (
                    <motion.div
                        className="settings-wrapper"
                        initial={{
                            backdropFilter: "blur(0px)",
                        }}
                        animate={{
                            backdropFilter: "blur(5px)",
                        }}
                        exit={{
                            backdropFilter: "blur(0px)",
                        }}
                        transition={{
                            type: "easeInOut",
                        }}
                        onClick={() => {
                            if (!isHovering) setOpen(false);
                        }}
                    >
                        <motion.div
                            className="settings-menu"
                            initial={{
                                opacity: 0,
                                scale: 0.5,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                            }}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <h3>Settings</h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0 1rem",
                                    margin: "1rem 0",

                                }}
                            >
                                <div>{duration} sec &nbsp; </div>
                                <SliderComp
                                    min={1}
                                    max={5}
                                    step={0.1}
                                    defaultValue={[duration]}
                                    setDefaultValue={setDuration}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
