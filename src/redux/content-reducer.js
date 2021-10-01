import {searchAPI} from '../api/API'

const SET_SEARCH_RESULT = 'book-searching/content-reducer/SET_SEARCH_RESULT'
const SET_SEARCH_VALUE = 'book-searching/content-reducer/SET_SEARCH_VALUE'


//Initial state

let initialState = {
    searchValue: '',
    items: []
}

//Action Creators
export const setSearchResult = (items) => ({type: SET_SEARCH_RESULT, items})
export const setSearchValue = (value) => ({type: SET_SEARCH_VALUE, value})


//Thunk Creators
export const getSearchResultThunk = (search) => async (dispatch) => {
    const response = await searchAPI.getBooks(search)
    if (response)
        dispatch(setSearchResult(response.items))
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
        default:
            return state
    }
}

export default contentReducer
