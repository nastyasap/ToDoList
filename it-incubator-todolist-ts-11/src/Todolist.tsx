import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo(({
                                        id,
                                        title,
                                        tasks,
                                        addTask,
                                        removeTask,
                                        changeTaskTitle,
                                        changeTaskStatus,
                                        changeFilter,
                                        filter,
                                        removeTodolist,
                                        changeTodolistTitle
                                    }: PropsType) => {
    console.log('Todolist was rendered')

    const addTaskCallback = useCallback((title: string) => {
        addTask(title, id);
    }, [addTask, id])

    const removeTodolistCallback = useCallback(() => {
        removeTodolist(id);
    }, [removeTodolist, id])
    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle(id, title);
    }, [changeTodolistTitle, id])

    const onAllClickHandler = useCallback(() => changeFilter("all", id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [changeFilter, id]);

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }


    return <div style={{width: 'fit-content', textAlign: 'center'}}>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleCallback}/>
            <IconButton onClick={removeTodolistCallback}><Delete color={'primary'}/></IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback}/>
        <List>
            {
                tasksForTodolist.map(t =>
                    <Task
                        key={t.id}
                        task={t}
                        todolistId={id}
                    />
                )
            }
        </List>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>

            <Button
                size={'small'}
                variant={'contained'}
                color={filter === 'all' ? 'secondary' : 'primary'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                size={'small'}
                variant={'contained'}
                color={filter === 'active' ? 'secondary' : 'primary'}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={'small'}
                variant={'contained'}
                color={filter === 'completed' ? 'secondary' : 'primary'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})





