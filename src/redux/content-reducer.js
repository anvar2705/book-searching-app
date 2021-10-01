import {searchAPI} from '../api/API'

const SET_SEARCH_RESULT = 'book-searching/content-reducer/SET_SEARCH_RESULT'
const SET_SEARCH_VALUE = 'book-searching/content-reducer/SET_SEARCH_VALUE'
const SET_SEARCH_COUNT = 'book-searching/content-reducer/SET_SEARCH_COUNT'


//Initial state

let initialState = {
    searchValue: '',
    totalItems: null,
    items: []
}

//Action Creators
export const setSearchResult = (items) => ({type: SET_SEARCH_RESULT, items})
export const setSearchValue = (value) => ({type: SET_SEARCH_VALUE, value})
export const setSearchCount = (count) => ({type: SET_SEARCH_COUNT, count})


//Thunk Creators
export const getSearchResultThunk = (search) => async (dispatch) => {
    const response = await searchAPI.getBooks(search)
    if (response) {
        dispatch(setSearchResult(response.items))
        dispatch(setSearchCount(response.totalItems))
    }
}


//Reducer
const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.value
            }
        case SET_SEARCH_RESULT:
            return {
                ...state,
                items: [...action.items]
            }
        case SET_SEARCH_COUNT:
            return {
                ...state,
                totalItems: action.count
            }
        default:
            return state
    }
}

export default contentReducer
