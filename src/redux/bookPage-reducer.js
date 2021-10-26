import { searchAPI } from '../api/API'

//Constants
const SET_BOOK_DATA = 'book-searching/bookPage-reducer/SET_BOOK_DATA'
const SET_PRELOADER = 'book-searching/bookPage-reducer/SET_PRELOADER'
const SET_ERROR = 'book-searching/bookPage-reducer/SET_ERROR'

//Initial state

let initialState = {
    bookData: {
        volumeInfo: {
            title: '',
            authors: [],
            description: '',
            categories: [],
            imageLinks: {},
        },
    },
    preloader: false,
    error: '',
}

//Action Creators
export const setBookData = (data) => ({ type: SET_BOOK_DATA, data })
export const setPreloader = (status) => ({ type: SET_PRELOADER, status })
export const setErrorBookPage = (error) => ({ type: SET_ERROR, error })

//Thunk Creators
export const getBookDataThunk = (id) => async (dispatch) => {
    dispatch(setPreloader(true))
    try {
        let response = await searchAPI.getSingleBook(id)
        if (response.data.id) dispatch(setBookData(response.data))
        else alert(response.error.message)
        dispatch(setPreloader(false))
    } catch (error) {
        dispatch(setPreloader(false))
        let errorGetSingleBook = error.response.data.error.message
        dispatch(setErrorBookPage(errorGetSingleBook))
    }
}

//Reducer
const bookPageReducer = (state = initialState, action) => {
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
