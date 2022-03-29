import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './ToDoList.module.css'
import {CheckBox} from "./components/CheckBox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, checked: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('VSE PROPALO!')
            setTitle("");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const changeStatusHandler = (tID: string, checked: boolean) => {
        props.changeStatus(tID, checked)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={error ? s.errorMessage : ''}>VSE PROPALO!</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    /*  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                          props.changeStatus(t.id,e.currentTarget.checked)
                      }*/

                    return (
                        <li className={t.isDone ? s.isDone : ''} key={t.id}>
                            <CheckBox isDone={t.isDone} callBack={(checked:boolean)=>changeStatusHandler(t.id, checked)}/>
                          {/*  <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={(event) =>
                                       changeStatusHandler(t.id, event.currentTarget.checked)}/>*/}
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>)
                })
            }
        </ul>
        <div>
            <button className={props.filter==='all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter==='active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter==='completed' ? s.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
