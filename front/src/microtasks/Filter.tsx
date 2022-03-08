import {useState} from "react";

type FilterType = {
    money: Array<moneyType>
    onClickFilterHandler: (value:string)=>void
}

type moneyType = {
    banknots: string
    value: number
    number: string
}

export const Filter = (props:FilterType) => {

    return (
        <>
            <ul>
                {props.money.map((el, index) => {
                    return (
                        <li key={index}>
                            <span>{el.banknots}</span>
                            <span>{el.value}</span>
                            <span>{el.number}</span>

                        </li>
                    )
                })}
            </ul>
            <div style={{marginLeft: '35px'}}>
                <button onClick={()=>props.onClickFilterHandler('All')}>All</button>
                <button onClick={()=>props.onClickFilterHandler('Rubles')}>Rubles</button>
                <button onClick={()=>props.onClickFilterHandler('Dollars')}>Dollar</button>

            </div>
        </>

    )

}