import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeFilterActionType = {
    type: 'CHANGE-FILTER'
    id: string
    filter: FilterValuesType
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TITLE'
    id: string
    title: string
}

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeFilterActionType
    | ChangeTodolistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodolistId = v1()
            return [{id: newTodolistId, title: action.title, filter: 'all'}, ...state];
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'CHANGE-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const RemoveTodolistActionCreator =
    (id: string): RemoveTodolistActionType => ({type: 'REMOVE-TODOLIST', id})
export const AddTodolistActionCreator =
    (title: string): AddTodolistActionType => ({type: 'ADD-TODOLIST', title})
export const ChangeFilterTodolistActionCreator =
    (id: string, filter: FilterValuesType): ChangeFilterActionType =>
        ({type: 'CHANGE-FILTER', id, filter})
export const ChangeTodolistTitleActionCreator =
    (id: string, title: string): ChangeTodolistTitleActionType =>
        ({type: 'CHANGE-TITLE', id, title})