import {ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler} from "react";

type InputType = {
    title: string
    setTitle: (title: string) => void
    callBack: () => void
}

export const Input = (props: InputType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBack();
        }
    }

    return (
        <input onChange={onChangeHandler}
               value={props.title}
               onKeyPress={onKeyPressHandler}
        />
    )
}