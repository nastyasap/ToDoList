import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'ad9832ce-880a-4ae9-b086-5b56273b3ae8'
    }
})

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: null | string
    totalCount: number
    items: Array<TaskType>
}

export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistApi = {
    getTodos: () => {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    createTodo: (title: string) => {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },

    deleteTodo: (todolistId: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodoTitle: (todolistId: string, title: string) => {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },

    getTasks: (todolistId: string) => {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },

    createTask: (todolistId: string, title: string) => {
        return instance.post<GetTasksResponse>(`todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask: (todolistId: string, taskId: string, payload: UpdateTaskType) => {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...payload})
    }
}