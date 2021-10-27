import { searchAPI } from '../api/API'

// Constants
const SET_BOOK_DATA = 'book-searching/bookPage-reducer/SET_BOOK_DATA'
const SET_PRELOADER = 'book-searching/bookPage-reducer/SET_PRELOADER'
const SET_ERROR = 'book-searching/bookPage-reducer/SET_ERROR'

// TYPES !!!
type InitialStateType = typeof initialState
type SetBookDataType = {
    type: typeof SET_BOOK_DATA
    data: Object
}
type SetPreloaderType = {
    type: typeof SET_PRELOADER
    status: boolean
}
type SetErrorBookPageType = {
    type: typeof SET_ERROR
    error: boolean
}

// Initial state
let initialState = {
    bookData: {
        volumeInfo: {
            title: '' as string,
            authors: [] as Array<string>,
            description: '' as string,
            categories: [] as Array<string>,
            imageLinks: {} as any,
        },
    },
    preloader: false as boolean,
    error: '' as string,
}

// Action Creators
export const setBookData = (data: any): SetBookDataType => ({ type: SET_BOOK_DATA, data })
export const setPreloader = (status: boolean): SetPreloaderType => ({ type: SET_PRELOADER, status })
export const setErrorBookPage = (error: boolean): SetErrorBookPageType => ({
    type: SET_ERROR,
    error,
})

// Thunk Creators
export const getBookDataThunk = (id: any) => async (dispatch: any) => {
    dispatch(setPreloader(true))
    try {
        let response = await searchAPI.getSingleBook(id)
        if (response.data.id) dispatch(setBookData(response.data))
        else alert(response.error.message)
        dispatch(setPreloader(false))
    } catch (error: any) {
        dispatch(setPreloader(false))
        let errorGetSingleBook = error.response.data.error.message
        dispatch(setErrorBookPage(errorGetSingleBook))
    }
}

// Reducer
const bookPageReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_BOOK_DATA:
            return {
                ...state,
                bookData: action.data,
            }
        case SET_PRELOADER:
            return {
                ...state,
                preloader: action.status,
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
}

export default bookPageReducer
