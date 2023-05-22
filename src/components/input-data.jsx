import { useRef, useEffect } from "react";

export default function InputData({ categories, addCategory, removeCategory, winner, animateInputField }) {

    const textInputField = useRef();
    const selectField = useRef();

    useEffect(() => {
        clearTextInput();
    },[categories])

    function clearTextInput() {
        textInputField.current.value = '';
    }

    return (
        <div className="input-data">
            <div className="game-container__winner">Result</div>
            <div className="game-container__result">{winner ? winner : 'None'}</div>
            <div className="input-data__add">
                <input className={`input-data__text ${animateInputField ? 'input-data__animate' : null}`} type="text" placeholder="Name" ref={textInputField}></input>
                <button className="input-data__button" onClick={() => addCategory(textInputField.current.value)}>Add</button>
            </div>
            <div className="input-data__remove">
                <select className="input-data__select" ref={selectField}>
                    <option></option>
                    {categories.map((item, key) => (
                        <option className="input-data__option" key={key}>{item.title}</option>
                    ))}
                </select>
                <button className="input-data__button" onClick={() => removeCategory(selectField)}>Remove</button>
            </div>
        </div>
    );
}