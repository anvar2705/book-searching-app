import { searchAPI } from '../api/API'

// Constants
const SET_SEARCH_RESULT = 'book-searching/content-reducer/SET_SEARCH_RESULT'
const CLEAR_SEARCH_RESULT = 'book-searching/content-reducer/CLEAR_SEARCH_RESULT'
const SET_SEARCH_VALUE = 'book-searching/content-reducer/SET_SEARCH_VALUE'
const SET_SEARCH_COUNT = 'book-searching/content-reducer/SET_SEARCH_COUNT'
const SET_START_INDEX = 'book-searching/content-reducer/SET_START_INDEX'
const SET_FETCHING = 'book-searching/content-reducer/SET_FETCHING'
const SET_PRELOADER = 'book-searching/content-reducer/SET_PRELOADER'
const SET_STOP_FETCHING = 'book-searching/content-reducer/SET_STOP_FETCHING'
const SET_SEARCH_FINISHED = 'book-searching/content-reducer/SET_SEARCH_FINISHED'
const SET_ERROR = 'book-searching/content-reducer/SET_ERROR'

// TYPES !!!
type InitialStateType = typeof initialState
type SetSearchResultType = { type: typeof SET_SEARCH_RESULT; items: object[] }
type ClearSearchResultType = { type: typeof CLEAR_SEARCH_RESULT }
type SetSearchValueType = {
    type: typeof SET_SEARCH_VALUE
    value: string
    category: string
    sortingBy: string
}
type SetSearchCountType = { type: typeof SET_SEARCH_COUNT; count: number }
type SetStartIndexType = { type: typeof SET_START_INDEX; startIndex: number }
type SetFetchingType = { type: typeof SET_FETCHING; status: boolean }
type SetPreloaderType = { type: typeof SET_PRELOADER; status: boolean }
type SetStopFetchingType = { type: typeof SET_STOP_FETCHING; status: boolean }
type SetSearchFinishedType = { type: typeof SET_SEARCH_FINISHED; status: boolean }
type SetErrorSearchPageType = { type: typeof SET_ERROR; error: any }
type ParametersGetSearchResultThunkType = {
    value: string
    category: string
    sortingBy: string
    paginationStep: number
    startIndex: number
}

// Initial state
let initialState = {
    search: {
        value: '',
        category: '',
        sortingBy: '',
    },
    totalItems: null as null | object,
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
export const setSearchResult = (items: object[]): SetSearchResultType => ({
    type: SET_SEARCH_RESULT,
    items,
})
export const clearSearchResult = (): ClearSearchResultType => ({ type: CLEAR_SEARCH_RESULT })
export const setSearchValue = (
    value: string,
    category: string,
    sortingBy: string
): SetSearchValueType => ({
    type: SET_SEARCH_VALUE,
    value,
    category,
    sortingBy,
})
export const setSearchCount = (count: number): SetSearchCountType => ({
    type: SET_SEARCH_COUNT,
    count,
})
export const setStartIndex = (startIndex: number): SetStartIndexType => ({
    type: SET_START_INDEX,
    startIndex,
})
export const setFetching = (status: boolean): SetFetchingType => ({ type: SET_FETCHING, status }) //  new request trigger
export const setPreloader = (status: boolean): SetPreloaderType => ({ type: SET_PRELOADER, status }) //  preloader trigger
export const setStopFetching = (status: boolean): SetStopFetchingType => ({
    type: SET_STOP_FETCHING,
    status,
}) //  trigger of finish loading data when totalItems reached
export const setSearchFinished = (status: boolean): SetSearchFinishedType => ({
    type: SET_SEARCH_FINISHED,
    status,
}) //  finishing searching trigger
export const setErrorSearchPage = (error: any): SetErrorSearchPageType => ({
    type: SET_ERROR,
    error,
}) //  error trigger

// Thunk Creators
export const getSearchResultThunk =
    (parameters: ParametersGetSearchResultThunkType) => async (dispatch: any) => {
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
export const searchResultReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_SEARCH_VALUE:
            return {
                ...state,
                search: {
                    ...state.search,
                    value: action.value,
                    category: action.category,
                    sortingBy: action.sortingBy,
                },
            }
        case SET_SEARCH_RESULT:
            return {
                ...state,
                items: [...state.items, ...action.items] as any,
            }
        case CLEAR_SEARCH_RESULT:
            return {
                ...state,
                items: [],
                startIndex: 0,
                searchFinished: false,
            }
        case SET_SEARCH_COUNT:
            return {
                ...state,
                totalItems: action.count,
            }
        case SET_START_INDEX:
            return {
                ...state,
                startIndex: action.startIndex,
            }
        case SET_FETCHING:
            return {
                ...state,
                fetching: action.status,
            }
        case SET_STOP_FETCHING:
            return {
                ...state,
                stopFetching: action.status,
            }
        case SET_PRELOADER:
            return {
                ...state,
                preloader: action.status,
            }
        case SET_SEARCH_FINISHED:
            return {
                ...state,
                searchFinished: action.status,
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
