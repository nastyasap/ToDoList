import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type FullInputType = {
    callBack:(title:string)=> void
}

export const FullInput = (props: FullInputType) => {

    let [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        props.callBack(title);
        setTitle("");
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }


    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
    )
}