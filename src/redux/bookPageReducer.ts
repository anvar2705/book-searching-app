import { searchAPI } from '../api/API'
import {
    TBookPageAction,
    bookPageActionTypes,
    TInitialState,
    TBookData,
    TBookPageThunk,
} from '../types/bookPageReducerTypes'

// Initial state
export let initialState = {
    bookData: {
        volumeInfo: {
            title: '',
            authors: [] as Array<string>,
            description: '',
            categories: [] as Array<string>,
            imageLinks: {},
        },
    },
    preloader: false,
    error: '',
}

// Action Creators
export const setBookData = (data: TBookData): TBookPageAction => ({
    type: bookPageActionTypes.SET_BOOK_DATA,
    data,
})
export const setPreloader = (status: boolean): TBookPageAction => ({
    type: bookPageActionTypes.SET_PRELOADER,
    status,
})
export const setErrorBookPage = (error: string): TBookPageAction => ({
    type: bookPageActionTypes.SET_ERROR,
    error,
})

// Thunk Creators
export const getBookDataThunk =
    (id: string): TBookPageThunk =>
    async (dispatch) => {
        dispatch(setPreloader(true))
        try {
            let response = await searchAPI.getSingleBook(id)
            if (response.data.id) dispatch(setBookData(response.data))
            else alert(response.error.message)
            dispatch(setPreloader(false))
        } catch (error: any) {
            dispatch(setPreloader(false))
            dispatch(setErrorBookPage(error.response.data.error.message))
        }
    }

// Reducer
export const bookPageReducer = (state = initialState, action: TBookPageAction): TInitialState => {
    switch (action.type) {
        case bookPageActionTypes.SET_BOOK_DATA:
            return {
                ...state,
                bookData: action.data,
            }
        case bookPageActionTypes.SET_PRELOADER:
            return {
                ...state,
                preloader: action.status,
            }
        case bookPageActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
}
