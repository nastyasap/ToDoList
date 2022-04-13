import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType;

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.todolistId]:
                    [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map
                    (task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(
                    task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState

        // const {[action.id]:[], ...rest} = {...state}
        // return rest
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: REMOVE_TASK, taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: ADD_TASK, title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: CHANGE_TASK_STATUS, taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: CHANGE_TASK_TITLE, taskId, title, todolistId}
}


// export const removeTaskAC = ( payload: {taskId: string, todolistId: string}) => {
//     return { type: 'REMOVE-TASK', taskId: payload.taskId, todolistId: payload.todolistId} as const
// }
// type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
