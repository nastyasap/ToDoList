import {MouseEvent} from "react";

const callBack = () => {
    alert('hey')
}

window.setTimeout( callBack, 1000)

export const User = () =>{

    const deleteUser = (event: MouseEvent<HTMLButtonElement>) => {
        debugger
    }

    return(
        <div>Nastya
        <button name={'delete'} onClick={deleteUser}>x</button>
        <button name={'save'} onClick={deleteUser}>x</button>
        </div>
    )
}