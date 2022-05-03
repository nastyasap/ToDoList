import React, {useEffect, useState} from 'react'
import {todolistApi, UpdateTaskType} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodo = (title: string) => {
        todolistApi.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'Inter title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={() => createTodo(title)}>Create todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodo = (todolistId: string) => {
        todolistApi.deleteTodo(todolistId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'Inter todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={() => deleteTodo(todolistId)}>Delete todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTodo = (todolistId: string, title: string) => {
        todolistApi.updateTodoTitle(todolistId, title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'Inter todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'Inter title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={() => updateTodo(todolistId, title)}>Update todolist title</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = (todolistId: string) => {
        todolistApi.getTasks(todolistId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'Inter todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={() => getTasks(todolistId)}>Get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = (todolistId: string, title: string) => {
        todolistApi.createTask(todolistId, title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'Inter todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'Inter title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={() => createTask(todolistId, title)}>Create todolist task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = (todolistId: string, taskId: string) => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'Inter todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'Inter taskId'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={() => deleteTask(todolistId, taskId)}>Delete todolist task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTask = (todolistId: string, taskId: string, payload: UpdateTaskType) => {
        todolistApi.updateTask(todolistId, taskId, payload)
            .then(res => setState(res.data))
    }

    const payload = {
        title: 'string',
        description: 'string',
        completed: true,
        status: 200,
        priority: 2,
        startDate: 'string',
        deadline: 'string'
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'Inter todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'Inter taskId'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={() => updateTask(todolistId, taskId, payload)}>Update todolist task</button>
        </div>
    </div>
}

