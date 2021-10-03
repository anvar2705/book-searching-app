import {searchAPI} from '../api/API'
import {act} from "@testing-library/react";


//Constants
const SET_SEARCH_RESULT = 'book-searching/content-reducer/SET_SEARCH_RESULT'
const CLEAR_SEARCH_RESULT = 'book-searching/content-reducer/CLEAR_SEARCH_RESULT'
const SET_SEARCH_VALUE = 'book-searching/content-reducer/SET_SEARCH_VALUE'
const SET_SEARCH_COUNT = 'book-searching/content-reducer/SET_SEARCH_COUNT'
const SET_START_INDEX = 'book-searching/content-reducer/SET_START_INDEX'
const SET_FETCHING = 'book-searching/content-reducer/SET_FETCHING'
const SET_PRELOADER = 'book-searching/content-reducer/SET_PRELOADER'
const SET_STOP_FETCHING = 'book-searching/content-reducer/SET_STOP_FETCHING'
const SET_FOUND_RESULTS = 'book-searching/content-reducer/SET_FOUND_RESULTS'


//Initial state

let initialState = {
    search: {
        value: '',
        category: '',
        sortingBy: ''
    },
    totalItems: null,
    preloader: false,
    fetching: false,
    stopFetching: false,
    foundResults: false,
    startIndex: 0,
    paginationStep: 30,
    items: []

}

//Action Creators
export const setSearchResult = (items) => ({type: SET_SEARCH_RESULT, items})
export const clearSearchResult = () => ({type: CLEAR_SEARCH_RESULT})
export const setSearchValue = (value, category, sortingBy) => ({type: SET_SEARCH_VALUE, value, category, sortingBy})
export const setSearchCount = (count) => ({type: SET_SEARCH_COUNT, count})
export const setStartIndex = (startIndex) => ({type: SET_START_INDEX, startIndex})
export const setFetching = (status) => ({type: SET_FETCHING, status})             //Триггер нового запроса
export const setPreloader = (status) => ({type: SET_PRELOADER, status})          //Триггер отображение прелоадера
export const setStopFetching = (status) => ({type: SET_STOP_FETCHING, status})   //Триггер окончания поиска
export const setFoundResults = (status) => ({type: SET_FOUND_RESULTS, status})   //Триггер отображения результата


//Thunk Creators
export const getSearchResultThunk = (search, paginationStep, startIndex, sortingBy) => async (dispatch) => {
    dispatch(setPreloader(true))
    const response = await searchAPI.getBooks(search, paginationStep, startIndex, sortingBy)
    if (response.data) {
        dispatch(setSearchResult(response.data.items))
        dispatch(setSearchCount(response.data.totalItems))

        if (response.data.items.length < paginationStep)
            dispatch(setStopFetching(true))
    }
    dispatch(setPreloader(false))
    dispatch(setFetching(false))
}

export const getSearchResultFilteredThunk = (search, paginationStep, startIndex, sortingBy, category) => async (dispatch) => {
    dispatch(setPreloader(true))
    let response
    let itemsLocal = []
    let startIndexLocal = 0
    do {
        response = await searchAPI.getBooks(search, paginationStep, startIndexLocal, sortingBy)
        if (response.data) {
            itemsLocal = itemsLocal.concat(response.data.items.filter(item => {
                if (item.volumeInfo.categories && item.volumeInfo.categories.join().toLowerCase().includes(category))
                    return true
            }))
            startIndexLocal += paginationStep
        }
    } while (startIndexLocal < response.data.totalItems)
    dispatch(setSearchResult(itemsLocal))
    dispatch(setFoundResults(true))
    dispatch(setSearchCount(itemsLocal.length))
    dispatch(setPreloader(false))
}


//Reducer
const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_VALUE:
            return {
                ...state,
                search: {
                    ...state.search,
                    value: action.value,
                    category: action.category,
                    sortingBy: action.sortingBy

                }
            }
        case SET_SEARCH_RESULT:
            return {
                ...state,
                items: [...state.items, ...action.items]
            }
        case CLEAR_SEARCH_RESULT:
            return {
                ...state,
                items: [],
                startIndex: 0,
                foundResults: false
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
        case SET_STOP_FETCHING:
            return {
                ...state,
                stopFetching: action.status
            }
        case SET_PRELOADER:
            return {
                ...state,
                preloader: action.status
            }
        case SET_FOUND_RESULTS:
            return {
                ...state,
                foundResults: action.status
            }
        default:
            return state
    }
}

export default contentReducer
