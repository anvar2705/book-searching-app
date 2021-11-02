import { initialState } from '../redux/searchResultReducer'

export enum searchResultActionTypes {
    SET_SEARCH_RESULT = 'book-searching/content-reducer/SET_SEARCH_RESULT',
    CLEAR_SEARCH_RESULT = 'book-searching/content-reducer/CLEAR_SEARCH_RESULT',
    SET_SEARCH_VALUE = 'book-searching/content-reducer/SET_SEARCH_VALUE',
    SET_SEARCH_COUNT = 'book-searching/content-reducer/SET_SEARCH_COUNT',
    SET_START_INDEX = 'book-searching/content-reducer/SET_START_INDEX',
    SET_FETCHING = 'book-searching/content-reducer/SET_FETCHING',
    SET_PRELOADER = 'book-searching/content-reducer/SET_PRELOADER',
    SET_STOP_FETCHING = 'book-searching/content-reducer/SET_STOP_FETCHING',
    SET_SEARCH_FINISHED = 'book-searching/content-reducer/SET_SEARCH_FINISHED',
    SET_ERROR = 'book-searching/content-reducer/SET_ERROR',
}

export type TInitialState = typeof initialState

interface ISetSearchResult {
    type: searchResultActionTypes.SET_SEARCH_RESULT
    items: object[]
}

interface IClearSearchResult {
    type: searchResultActionTypes.CLEAR_SEARCH_RESULT
}

interface ISetSearchValue {
    type: searchResultActionTypes.SET_SEARCH_VALUE
    value: string
    category: string
    sortingBy: string
}

interface ISetSearchCount {
    type: searchResultActionTypes.SET_SEARCH_COUNT
    count: number
}

interface ISetStartIndex {
    type: searchResultActionTypes.SET_START_INDEX
    startIndex: number
}

interface ISetFetching {
    type: searchResultActionTypes.SET_FETCHING
    status: boolean
}

interface ISetPreloader {
    type: searchResultActionTypes.SET_PRELOADER
    status: boolean
}

interface ISetStopFetching {
    type: searchResultActionTypes.SET_STOP_FETCHING
    status: boolean
}

interface ISetSearchFinished {
    type: searchResultActionTypes.SET_SEARCH_FINISHED
    status: boolean
}

interface ISetErrorSearchPage {
    type: searchResultActionTypes.SET_ERROR
    error: any
}

export interface IParametersGetSearchResultThunk {
    value: string
    category: string
    sortingBy: string
    paginationStep: number
    startIndex: number
}

export type TSearchResultAction =
    | ISetSearchResult
    | IClearSearchResult
    | ISetSearchValue
    | ISetSearchCount
    | ISetStartIndex
    | ISetFetching
    | ISetPreloader
    | ISetStopFetching
    | ISetSearchFinished
    | ISetErrorSearchPage
