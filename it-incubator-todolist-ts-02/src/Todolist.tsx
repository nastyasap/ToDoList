import React from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (value:number)=>void
    filteredValues: (value:FilterValuesType)=>void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(el =>
                <li key={el.id}>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={() => {props.removeTask(el.id)}}>x</button>
                </li>
            )}
        </ul>
        <div>
            <button onClick={()=>props.filteredValues('All')}>All</button>
            <button onClick={()=>props.filteredValues('Active')}>Active</button>
            <button onClick={()=>props.filteredValues('Completed')}>Completed</button>
        </div>
    </div>
}
