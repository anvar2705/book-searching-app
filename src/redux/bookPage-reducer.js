import {searchAPI} from '../api/API'


//Constants
const SET_BOOK_DATA = 'book-searching/bookPage-reducer/SET_BOOK_DATA'
const SET_PRELOADER = 'book-searching/bookPage-reducer/SET_PRELOADER'


//Initial state

let initialState = {
    bookData: {
        volumeInfo: {
            title: '',
            authors: [],
            description: '',
            categories: [],
            imageLinks: {}
        }
    },
    preloader: false
}

//Action Creators
export const setBookData = (data) => ({type: SET_BOOK_DATA, data})
export const setPreloader = (status) => ({type: SET_PRELOADER, status})


//Thunk Creators
export const getBookDataThunk = (id) => async (dispatch) => {
    dispatch(setPreloader(true))
    const response = await searchAPI.getSingleBook(id)
    if (response.data.id)
        dispatch(setBookData(response.data))
    else
        alert(response.error.message)
    dispatch(setPreloader(false))
}


//Reducer
const bookPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOK_DATA:
            return {
                ...state,
                bookData: action.data
            }
        case SET_PRELOADER:
            return {
                ...state,
                preloader: action.status
            }
        default:
            return state
    }
}

export default bookPageReducer
