import React, {ChangeEvent} from "react";

type CheckBoxType = {
    isDone: boolean
    callBack: (checked: boolean) => void
}

export const CheckBox = (props: CheckBoxType) => {
    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }

    return (
        <input type="checkbox"
               checked={props.isDone}
               onChange={changeStatusHandler}/>
    )
}
