import { useState, useEffect, useRef } from "react";

import WheelTile from "./wheel-tile";
import WheelTitle from "./wheel-title";

export default function Wheel({ categories, availableColors, tileCount, getWinner }) {

    const [spinAmount, setSpinAmount] = useState(180);
    const spinLock = useRef();

    useEffect(() => {
       spinLock.current = false; 
    },[])

    const spinValue = {
        transform: `rotate(${spinAmount}deg)` 
    }

    function spin() {
        if (categories.length === 0 || spinLock.current) return;
        let spinValue = generateSpinValue();
        setSpinAmount(previous => previous + spinValue);
        spinLock.current = true;
        setTimeout(() => {
            getWinner(spinAmount + spinValue);
            spinLock.current = false;
        }, 4000)
    }

    function generateSpinValue() {
        const minValue = 2160;
        const maxValue = 360 + minValue;
        return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    }
    
    return (
        <svg className="wheel" height="500" width="500" style={spinValue} onClick={() => spin()}>
            {categories.map((item, key) => (
                <WheelTile backgroundColor={item.backgroundColor} position={item.position} tileCount={tileCount} key={key}></WheelTile>
            ))}
            {categories.map((item, key) => (
                <WheelTitle title={item.title} position={item.position} tileCount={tileCount} key={key}></WheelTitle>
            ))}
            {(categories.length === 0 ? (
                <WheelTile backgroundColor={availableColors[0]} position={0} tileCount={1}></WheelTile>
            ) : null)}
        </svg>
    );
}