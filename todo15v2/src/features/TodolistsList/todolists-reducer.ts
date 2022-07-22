import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

// export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolistsTC', (thunkAPI) => {
//     thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
//     const res = await todolistsAPI.getTodolists()
//         .then((res) => {
//             thunkAPI.dispatch(setTodolistsAC({todolists: res.data}))
//             thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
//             return res.data
//         })
//         .then(todos => {
//             todos.forEach(tl => thunkAPI.dispatch(fetchTasksTC(tl.id)))
//         })
//         .catch((error: AxiosError) => {
//             handleServerNetworkError(thunkAPI.dispatch, error.message)
//         })
// })

export const fetchTodolistsTC = () => {
    return (dispatch: any) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return res.data
            })
            .then(todos => {
                todos.forEach(tl => dispatch(fetchTasksTC(tl.id)))
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(dispatch, error.message)
            })
    }
}

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodoEntityStatusAC(state, action: PayloadAction<{ status: RequestStatusType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        clearDataLogoutAC() {
            return []
        },


    }
})

export const todolistsReducer = slice.reducer


export const {
    removeTodolistAC, addTodolistAC, changeTodolistTitleAC,
    changeTodolistFilterAC, setTodolistsAC, changeTodoEntityStatusAC, clearDataLogoutAC
} = slice.actions

//     (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.id)
//         case 'ADD-TODOLIST':
//             return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         case 'SET-TODOLISTS':
//             return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
//         case "CHANGE-ENTITY-STATUS":
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//         case "CLEAR-DATA":
//             return []
//         default:
//             return state
//     }
// }

// thunks

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodoEntityStatusAC({status: 'loading', id: todolistId}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id: todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(dispatch, error.message)
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(dispatch, error.message)
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({id, title}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(dispatch, error.message)
            })
    }
}

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
