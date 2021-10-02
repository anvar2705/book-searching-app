import {searchAPI} from '../api/API'

const SET_SEARCH_RESULT = 'book-searching/content-reducer/SET_SEARCH_RESULT'
const SET_SEARCH_VALUE = 'book-searching/content-reducer/SET_SEARCH_VALUE'
const SET_SEARCH_COUNT = 'book-searching/content-reducer/SET_SEARCH_COUNT'
const SET_LOADING = 'book-searching/content-reducer/SET_LOADING'


//Initial state

let initialState = {
    searchValue: '',
    totalItems: null,
    loading: false,
    items: []
}

//Action Creators
export const setSearchResult = (items) => ({type: SET_SEARCH_RESULT, items})
export const setSearchValue = (value) => ({type: SET_SEARCH_VALUE, value})
export const setSearchCount = (count) => ({type: SET_SEARCH_COUNT, count})
export const setLoading = (status) => ({type: SET_LOADING, status})


//Thunk Creators
export const getSearchResultThunk = (search) => async (dispatch) => {
    dispatch(setLoading(true))
    const response = await searchAPI.getBooks(search)
    dispatch(setLoading(false))
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
        case SET_LOADING:
            return {
                ...state,
                loading: action.status
            }
        default:
            return state
    }
}

export default contentReducer
