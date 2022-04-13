import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TodolistType} from "./AppWithRedux1";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/storeRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistId1} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function Todolist1(props: PropsType) {
    const todolistId = props.todolist.id
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()
    let tasksForTodolist = tasks
    if (props.todolist.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }


    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todolistId));
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "all"));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "active"));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "completed"));

    return <div style={{width: 'fit-content', textAlign: 'center'}}>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}><Delete color={'primary'}/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, todolistId))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolistId));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, todolistId));
                    }


                    return <li
                        key={t.id}
                        className={t.isDone ? "is-done" : ""}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}><Delete fontSize={'small'}
                                                                     color={'primary'}/></IconButton>
                    </li>
                })
            }
        </List>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>

            <Button
                size={'small'}
                variant={'contained'}
                color={props.todolist.filter === 'all' ? 'secondary' : 'primary'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                size={'small'}
                variant={'contained'}
                color={props.todolist.filter === 'active' ? 'secondary' : 'primary'}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={'small'}
                variant={'contained'}
                color={props.todolist.filter === 'completed' ? 'secondary' : 'primary'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


