import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    //changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let [title, setTitle] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickButtonHandler()
        }
    }

    const onClickChangeFilterHandler = (value: FilterValuesType) => {
        changeFilter(value)
    }

    const onClickRemoveTaskHandler = (id: string) => props.removeTask(id)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyPress={onKeyPressHandler} value={title} onChange={onChangeInputHandler}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t =>
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => onClickRemoveTaskHandler(t.id)}>x</button>
                    </li>
                )
            }

        </ul>
        <div>
            <button onClick={() => onClickChangeFilterHandler('all')}>All</button>
            <button onClick={() => onClickChangeFilterHandler('active')}>Active</button>
            <button onClick={() => onClickChangeFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}
