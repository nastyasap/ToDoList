import {useState} from "react";

export const UseState = () => {
    let [a, setA] = useState(1)
    const onClickHandler = () => {
        setA(++a);
        console.log(a)
    }
    const onClickHandler2 = () => {
        setA(a=1);
        console.log(a)
    }

    return (
        <div>
            <h1>{a}</h1>
            <button onClick={onClickHandler}>number</button>
            <button onClick={onClickHandler2}>0</button>
        </div>

    )
}