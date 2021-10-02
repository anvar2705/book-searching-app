import {searchAPI} from '../api/API'
import {act} from "@testing-library/react";


//Constants
const SET_SEARCH_RESULT = 'book-searching/content-reducer/SET_SEARCH_RESULT'
const SET_SEARCH_VALUE = 'book-searching/content-reducer/SET_SEARCH_VALUE'
const SET_SEARCH_COUNT = 'book-searching/content-reducer/SET_SEARCH_COUNT'
const SET_START_INDEX = 'book-searching/content-reducer/SET_START_INDEX'
const SET_FETCHING = 'book-searching/content-reducer/SET_FETCHING'
const SET_PRELOADER = 'book-searching/content-reducer/SET_PRELOADER'



//Initial state

let initialState = {
    searchValue: '',
    totalItems: null,
    preloader: false,
    fetching: false,
    startIndex: 0,
    paginationStep: 30,
    items: []
}

//Action Creators
export const setSearchResult = (items) => ({type: SET_SEARCH_RESULT, items})
export const setSearchValue = (value) => ({type: SET_SEARCH_VALUE, value})
export const setSearchCount = (count) => ({type: SET_SEARCH_COUNT, count})
export const setStartIndex = (startIndex) => ({type: SET_START_INDEX, startIndex})
export const setFetching = (status) => ({type: SET_FETCHING, status})
export const setPreloader = (status) => ({type: SET_PRELOADER, status})


//Thunk Creators
export const getSearchResultThunk = (search, paginationStep, startIndex) => async (dispatch) => {
    dispatch(setPreloader(true))
    const response = await searchAPI.getBooks(search, paginationStep, startIndex)
    if (response) {
        dispatch(setSearchResult(response.items))
        dispatch(setSearchCount(response.totalItems))
    }
    dispatch(setPreloader(false))
    dispatch(setFetching(false))
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
                items: [...state.items, ...action.items]
            }
        case SET_SEARCH_COUNT:
            return {
                ...state,
                totalItems: action.count
            }
        case SET_START_INDEX:
            return {
                ...state,
                startIndex: action.startIndex
            }
        case SET_FETCHING:
            return {
                ...state,
                fetching: action.status
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

export default contentReducer
