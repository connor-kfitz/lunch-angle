import { useRef } from "react";

export default function InputData({ addCategory, animateInputField }) {

    const textInputField = useRef();

    return (
        <div className="input-data">
            <form >
                <input className={`input-data__text ${animateInputField ? 'input-data__animate' : null}`} type="text" ref={textInputField}></input>
            </form>
            <button className="input-data__button" onClick={() => addCategory(textInputField.current.value)}>Add</button>
        </div> 
    );
}