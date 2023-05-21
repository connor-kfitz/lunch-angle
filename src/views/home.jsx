import { useState, useEffect } from 'react';

import InputData from '../components/input-data';
import Wheel from '../components/wheel';
import * as Constants from '../constants';

export default function Home() {

    const [categories, setCategories] = useState([]);
    const [availableColors, setAvailableColors] = useState(Constants.colors)
    const [animateInputField, setAnimateInputField] = useState(false);
    const [winner, setWinner] = useState('');

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

    function removeCategory(title) {
        if (categories.length === 0 || !title.current.value) return;
        const index = categories.map(item => item.title).indexOf(title.current.value);
        let cateogriesDeepCopy = JSON.parse(JSON.stringify(categories));
        let color = cateogriesDeepCopy[index].backgroundColor
        cateogriesDeepCopy.splice(index, 1);
        let positionIncrement = 360 / (cateogriesDeepCopy.length);
        cateogriesDeepCopy.map((item, key) => item.position = key * positionIncrement);
        setAvailableColors(previous => [color, ...previous]);
        setCategories(cateogriesDeepCopy);
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

    function getWinner(spin) {
        if (categories.length === 1) return setWinner(categories[0].title);
        const relativeSpin = 360 - (spin % 360);
        let winner = "";
        categories.forEach((item) => {
            if (relativeSpin > item.position && relativeSpin < item.position + (360 / categories.length)) {
                winner = item.title;
            }
        })
        return setWinner(winner);
    }

    return (
        <div className="home">
            <div className="board">
                <InputData categories={categories} addCategory={addCategory} removeCategory={removeCategory} 
                animateInputField={animateInputField} winner={winner}></InputData>
                <div className="game-container">
                    <Wheel categories={categories} availableColors={availableColors} tileCount={getTileCount()} getWinner={getWinner}></Wheel>
                    <div className="wheel__center"></div>
                </div>
                <div className="game-container__icon">
                    <div className="game-container__arrow"></div>
                </div>
            </div>
        </div>
    );
}