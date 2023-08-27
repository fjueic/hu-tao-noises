import { useEffect, useState } from "react";
import "./App.css";
import anime from "animejs/lib/anime.es.js";
import Settings from "./components/Settings/Settings";
import { motion } from "framer-motion";
import { phraseData } from "./constants/huTaoLine";
import sound_1 from "./sounds/1.mp3";
import sound_2 from "./sounds/2.mp3";
import sound_3 from "./sounds/3.mp3";
import sound_4 from "./sounds/4.mp3";
import sound_5 from "./sounds/5.mp3";
import sound_6 from "./sounds/6.mp3";
import sound_7 from "./sounds/7.mp3";
import idle from "./sounds/idle.mp3";
import image_1 from "./images/1.png";
import image_2 from "./images/2.png";
import image_3 from "./images/3.png";
import image_4 from "./images/4.png";
import image_5 from "./images/5.png";
import image_6 from "./images/6.png";
import image_7 from "./images/7.png";
import image_8 from "./images/8.png";
import image_9 from "./images/9.png";
import image_10 from "./images/10.webp";
import image_11 from "./images/11.webp";
import image_12 from "./images/12.png";
let image_list = [
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
    image_6,
    image_7,
    image_8,
    image_9,
    image_10,
    image_11,
    image_12,
];
function App() {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(1);
    const [phrase, setPhrase] = useState("");
    const [sound] = useState([
        new Audio(sound_1),
        new Audio(sound_2),
        new Audio(sound_3),
        new Audio(sound_4),
        new Audio(sound_5),
        new Audio(sound_6),
        new Audio(sound_7),
    ]);
    // const [idleSound, setIdleSound] = useState(new Audio(idle));
 
    useEffect(() => {
        setPhrase(phraseData[Math.floor(Math.random() * phraseData.length)]);
        let data = localStorage.getItem("hu-tao-noises-data");
        if (data) {
            data = JSON.parse(data);
            setCount(data.count);
            setDuration(data.duration);
        } else {
            localStorage.setItem(
                "hu-tao-noises-data",
                JSON.stringify({ count: 0, duration: 1 })
            );
            setCount(0);
            setDuration(1);
        }
    }, []);
    useEffect(() => {
        if (count !== 0)
            localStorage.setItem(
                "hu-tao-noises-data",
                JSON.stringify({ count, duration })
            );
        setPhrase(phraseData[Math.floor(Math.random() * phraseData.length)]);
    }, [count]);
    const imageWithAnimation = (image) => {
        let img = new Image();
        img.classList.add("image");
        img.classList.add("hide");
        img.src = image;
        img.id = count;
        let app = document.querySelector(".App");
        app.appendChild(img);
        img.onload = () => {
            img.classList.remove("hide");
            anime({
                targets: img,
                duration: duration * 1000,
                complete: () => {
                    img.remove();
                },
            });
            anime({
                targets: img,
                scale: 2,
                rotate: anime.random(-90, 90),
                duration: duration * 1000,
                easing: "easeInOutQuad",
            });
        };
        anime({
            targets: img,
            top: anime.random(-100, window.innerHeight - 100),
            left: anime.random(-100, window.innerWidth - 100),
            duration: 1,
        });
    };
    return (
        <div className="App">
            <Settings
                open={open}
                setOpen={setOpen}
                duration={duration}
                setDuration={setDuration}
            />
            <div className="counter">Count: {count}</div>

            <motion.div
                className="button"
                style={{
                    zIndex: open ? -1 : 10,
                }}
                initial={{
                    translateX: "calc(50vw - 50%)",
                    translateY: "calc(75vh - 50%)",
                }}
                whileHover={{
                    scale: 1.02,
                    transition: {
                        type: "linear",
                        duration: 0.1,
                    },
                }}
                whileTap={{
                    scale: 0.94,
                    transition: {
                        type: "easeOut",
                        duration: 0.01,
                    },
                }}
                onClick={() => {
                    setCount((prev) => prev + 1);
                    sound[Math.floor(Math.random() * sound.length)]
                        .cloneNode()
                        .play();
                    imageWithAnimation(
                        image_list[
                            Math.floor(Math.random() * image_list.length)
                        ]
                    );
                }}
            >
                {phrase}
            </motion.div>
        </div>
    );
}

export default App;
