import { useState } from "react";

import WheelTile from "./wheel-tile";

export default function Wheel({ categories }) {

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
        <div className="wheel" style={spinValue} onClick={() => spin()}>
            {categories.map((item, key) => (
                <WheelTile title={item.title} backgroundColor={item.backgroundColor} position={item.position} key={key}></WheelTile>
            ))}
            <div className="wheel__center"></div>
        </div>
    );
}