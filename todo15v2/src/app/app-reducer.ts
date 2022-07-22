import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'loading' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
    },
    reducers: {
        setAppStatusAC (state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC (state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setIsInitializedAC (state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})



export type AppActionsType = SetAppStatusType | SetAppErrorType | SetIsInitializedType
type SetAppStatusType = ReturnType<typeof setAppStatusAC>
type SetAppErrorType = ReturnType<typeof setAppErrorAC>
type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}
