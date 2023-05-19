import { useState } from "react";

import WheelTile from "./wheel-tile";

export default function Wheel({ categories, tileCount }) {

    const [spinAmount, setSpinAmount] = useState(0);

    const spinValue = {
        transform: `rotate(${spinAmount}deg)` 
    }

    function spin() {
        setSpinAmount(previous => previous + generateSpinValue());
    }

    function generateSpinValue() {
        const minValue = 2160;
        const maxValue = 360 + minValue;
        return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    }
    
    return (
        <svg className="wheel" height="500" width="500" style={spinValue} onClick={() => spin()}>
            {categories.map((item, key) => (
                <WheelTile title={item.title} backgroundColor={item.backgroundColor} position={item.position} tileCount={tileCount} key={key}></WheelTile>
            ))}
        </svg>
    );
}