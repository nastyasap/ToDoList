import {addTodolistAC, clearDataLogoutAC, removeTodolistAC, setTodolistsAC,} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

// thunks
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasksTC', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    try {
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (error: AxiosError | any) {
        handleServerNetworkError(thunkAPI.dispatch, error.message)
    }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTaskTC', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTaskEntityStatusAC({status: 'loading', taskId: param.taskId, todoId: param.todolistId}))
    try {
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {taskId: param.taskId, todolistId: param.todolistId}
    } catch (error: AxiosError | any) {
        handleServerNetworkError(thunkAPI.dispatch, error.message)
    }
})

export const addTaskTC = createAsyncThunk('tasks/addTaskTC', async (param: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTask(param.todolistId, param.title)
    try {
        if (res.data.resultCode === ResultCodeStatuses.success) {
            const task = res.data.data.item
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {task}
        } else {
            handleServerAppError(thunkAPI.dispatch, res.data)
        }
    } catch (error: AxiosError | any) {
        handleServerNetworkError(thunkAPI.dispatch, error.message)
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTaskTC', async (param: {taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string}, thunkAPI) => {
        const state = thunkAPI.getState()
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.domainModel
        }
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    const action = updateTaskAC({taskId, model: param.domainModel, todolistId})
                    thunkAPI.dispatch(action)
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(thunkAPI.dispatch, res.data)
                }
            })
            .catch((error: AxiosError) => {
                    handleServerNetworkError(thunkAPI.dispatch, error.message)
                }
            )
    })

export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
        //     const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         state[action.payload.todolistId].splice(index, 1)
        //     }
        // },
        // addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
        //     state[action.payload.task.todoListId].unshift(action.payload.task)
        // },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        // setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
        //     state[action.payload.todolistId] = action.payload.tasks
        // },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ status: RequestStatusType, taskId: string, todoId: string }>) {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index].entityStatus = action.payload.status
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        });
        builder.addCase(clearDataLogoutAC, (state, action) => {
            return {}
        });
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todolistId] = action.payload.tasks
            }
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload!.taskId)
                if (index > -1) {
                    state[action.payload.todolistId].splice(index, 1)
                }
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            }
        });
    }
})


//     (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
//     switch (action.type) {
//         case 'REMOVE-TASK':
//             return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
//         case 'ADD-TASK':
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case 'UPDATE-TASK':
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId]
//                     .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
//             }
//         case 'ADD-TODOLIST':
//             return {...state, [action.todolist.id]: []}
//         case 'REMOVE-TODOLIST':
//             const copyState = {...state}
//             delete copyState[action.id]
//             return copyState
//         case 'SET-TODOLISTS': {
//             const copyState = {...state}
//             action.todolists.forEach(tl => {
//                 copyState[tl.id] = []
//             })
//             return copyState
//         }
//         case 'SET-TASKS':
//             return {...state, [action.todolistId]: action.tasks}
//         case 'TASK/CHANGE-ENTITY-STATUS':
//             return {
//                 ...state,
//                 [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
//                     ...t,
//                     entityStatus: action.status
//                 } : t)
//             }
//         case "CLEAR-DATA":
//             return {}
//         default:
//             return state
//     }
// }
export const tasksReducer = slice.reducer

export const {
    changeTaskEntityStatusAC, updateTaskAC
} = slice.actions


enum ResultCodeStatuses {
    'success' = 0,
    'error' = 1,
    'captcha' = 10
}


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
