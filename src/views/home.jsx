import { useState, useEffect } from 'react';

import InputData from '../components/input-data';
import Wheel from '../components/wheel';
import * as Constants from '../constants';

export default function Home() {

    const [categories, setCategories] = useState([]);
    const [availableColors, setAvailableColors] = useState(Constants.colors)
    const [animateInputField, setAnimateInputField] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (animateInputField) setAnimateInputField(false);
        }, 300)
    },[animateInputField])

    function addCategory(title) {
        if (checkAvailableColors()) return;
        if (checkTitle(title)) return setAnimateInputField(true);
        let color = getColor();
        let newCateogry = {title: title, backgroundColor: color, position: 0};
        let cateogriesDeepCopy = JSON.parse(JSON.stringify(categories));
        if (cateogriesDeepCopy.length < 1) setCategories([newCateogry])
        else {
            cateogriesDeepCopy.push(newCateogry);
            let positionIncrement = 360 / (cateogriesDeepCopy.length);
            cateogriesDeepCopy.map((item, key) => item.position = key * positionIncrement);
            setCategories(cateogriesDeepCopy);
        }
    }

    function getColor() {
        setAvailableColors(previous => previous.slice(1));
        return availableColors[0];
    }

    function getTileCount() {
        return categories.length;
    }

    function checkAvailableColors() {
        if (categories.length >= Constants.colors.length ) return true;
        return false;
    }

    function checkTitle(title) {
        if (!title) return true;
        let lowerCaseTitle = title.toLowerCase();
        if (categories.some((item) => item.title.toLowerCase() === lowerCaseTitle)) return true;
        return false;
    }

    return (
        <div className="home">
            <InputData addCategory={addCategory} animateInputField={animateInputField}></InputData>
            <div className="game-container">
                <div className="game-container__icon">
                    <div className="game-container__arrow"></div>
                </div>
                <Wheel categories={categories} tileCount={getTileCount()}></Wheel>
                <div className="wheel__center"></div>
            </div>
        </div>
    );
}