import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {TaskType} from "../TodoList/Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../store/tasks-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    console.log('Task')
    const dispatch = useDispatch()
    const onClickHandler = useCallback(() => dispatch(removeTaskAC(task.id, todolistId)), [dispatch, task.id, todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }, [dispatch, task.id, todolistId])
    const onTitleChangeHandler = useCallback((newValue: string) => dispatch(changeTaskTitleAC(task.id, newValue, todolistId)), [dispatch, task.id, todolistId])


    return <li
        key={task.id}
        className={task.isDone ? "is-done" : ""}
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}
    >
        <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}><Delete fontSize={'small'}
                                                     color={'primary'}/></IconButton>
    </li>
})