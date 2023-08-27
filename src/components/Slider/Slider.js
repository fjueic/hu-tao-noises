import React from "react";
import * as Slider from "@radix-ui/react-slider";
import "./styles.css";

const SliderComp = ({ min, max, step, defaultValue, setDefaultValue }) => (
    <form>
        <Slider.Root
            className="SliderRoot"
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
            onValueChange={(value) => setDefaultValue(value[0])}
        >
            <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
            </Slider.Track>

            <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
    </form>
);

export default SliderComp;
