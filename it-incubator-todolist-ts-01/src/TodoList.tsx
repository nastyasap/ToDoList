import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";

type TodoListType = {
    title: string
    tasks: Array<ObjectFromArray>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeIsDoneStatus: (id: string, checked: boolean) => void
};

export type ObjectFromArray = {
    id: string
    title: string
    isDone: boolean
};

export const TodoList = (props: TodoListType) => {
    /*    const removeTaskHandler = ()=>{
            props.removeTask
        }*/

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTask = () => {
        if (title.trim()!=='') {
            props.addTask(title.trim())
            setTitle('')
        }else{
            setError('title is not correct')
            setTitle('')
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    const onClickRemoveTask = (id: string) => {
        props.removeTask(id)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                        const changeIsDoneStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDoneStatus(t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id}>
                            <input type={"checkbox"}
                                   checked={t.isDone}
                                   onChange={changeIsDoneStatus}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                onClickRemoveTask(t.id)
                            }}>x
                            </button>
                        </li>
                    }
                )}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}> Active</button>
                <button onClick={() => props.changeFilter('completed')}> Completed</button>
            </div>
        </div>
    );
};