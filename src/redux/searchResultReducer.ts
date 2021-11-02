import { searchAPI } from '../api/API'
import {
    TInitialState,
    IParametersGetSearchResultThunk,
    searchResultActionTypes,
    TSearchResultAction,
} from '../types/searchResultReducerTypes'
import { Dispatch } from 'react'

// Initial state
export const initialState = {
    search: {
        value: '',
        category: '',
        sortingBy: '',
    },
    totalItems: null as null | number,
    preloader: false,
    fetching: false,
    stopFetching: false,
    startIndex: 0,
    paginationStep: 30,
    items: [],
    searchFinished: false,
    error: '',
}

// Action Creators
export const setSearchResult = (items: object[]): TSearchResultAction => ({
    type: searchResultActionTypes.SET_SEARCH_RESULT,
    items,
})
export const clearSearchResult = (): TSearchResultAction => ({
    type: searchResultActionTypes.CLEAR_SEARCH_RESULT,
})
export const setSearchValue = (
    value: string,
    category: string,
    sortingBy: string
): TSearchResultAction => ({
    type: searchResultActionTypes.SET_SEARCH_VALUE,
    value,
    category,
    sortingBy,
})
export const setSearchCount = (count: number): TSearchResultAction => ({
    type: searchResultActionTypes.SET_SEARCH_COUNT,
    count,
})
export const setStartIndex = (startIndex: number): TSearchResultAction => ({
    type: searchResultActionTypes.SET_START_INDEX,
    startIndex,
})
export const setFetching = (status: boolean): TSearchResultAction => ({
    type: searchResultActionTypes.SET_FETCHING,
    status,
}) //  new request trigger
export const setPreloader = (status: boolean): TSearchResultAction => ({
    type: searchResultActionTypes.SET_PRELOADER,
    status,
}) //  preloader trigger
export const setStopFetching = (status: boolean): TSearchResultAction => ({
    type: searchResultActionTypes.SET_STOP_FETCHING,
    status,
}) //  trigger of finish loading data when totalItems reached
export const setSearchFinished = (status: boolean): TSearchResultAction => ({
    type: searchResultActionTypes.SET_SEARCH_FINISHED,
    status,
}) //  finishing searching trigger
export const setErrorSearchPage = (error: boolean): TSearchResultAction => ({
    type: searchResultActionTypes.SET_ERROR,
    error,
}) //  error trigger

// Thunk Creators
export const getSearchResultThunk =
    (parameters: IParametersGetSearchResultThunk) =>
    async (dispatch: Dispatch<TSearchResultAction>) => {
        dispatch(setPreloader(true))
        try {
            let response = await searchAPI.getBooks(parameters)
            if (response.data) {
                if (response.data.totalItems !== 0) {
                    dispatch(setSearchResult(response.data.items))
                    dispatch(setSearchCount(response.data.totalItems))

                    if (response.data.items.length < parameters.paginationStep)
                        dispatch(setStopFetching(true))
                } else dispatch(setSearchCount(response.data.totalItems))
                dispatch(setPreloader(false))
                dispatch(setFetching(false))
                dispatch(setSearchFinished(true))
            }
        } catch (error: any) {
            dispatch(setPreloader(false))
            let errorGetBooks = error.response.data.error.message
            dispatch(setErrorSearchPage(errorGetBooks))
        }
    }

// Reducer
export const searchResultReducer = (
    state = initialState,
    action: TSearchResultAction
): TInitialState => {
    switch (action.type) {
        case searchResultActionTypes.SET_SEARCH_VALUE:
            return {
                ...state,
                search: {
                    ...state.search,
                    value: action.value,
                    category: action.category,
                    sortingBy: action.sortingBy,
                },
            }
        case searchResultActionTypes.SET_SEARCH_RESULT:
            return {
                ...state,
                items: [...state.items, ...action.items] as any,
            }
        case searchResultActionTypes.CLEAR_SEARCH_RESULT:
            return {
                ...state,
                items: [],
                startIndex: 0,
                searchFinished: false,
            }
        case searchResultActionTypes.SET_SEARCH_COUNT:
            return {
                ...state,
                totalItems: action.count,
            }
        case searchResultActionTypes.SET_START_INDEX:
            return {
                ...state,
                startIndex: action.startIndex,
            }
        case searchResultActionTypes.SET_FETCHING:
            return {
                ...state,
                fetching: action.status,
            }
        case searchResultActionTypes.SET_STOP_FETCHING:
            return {
                ...state,
                stopFetching: action.status,
            }
        case searchResultActionTypes.SET_PRELOADER:
            return {
                ...state,
                preloader: action.status,
            }
        case searchResultActionTypes.SET_SEARCH_FINISHED:
            return {
                ...state,
                searchFinished: action.status,
            }
        case searchResultActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
}
