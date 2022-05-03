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
    }
}