import { initialState } from '../redux/bookPageReducer'

export enum bookPageActionTypes {
    SET_BOOK_DATA = 'book-searching/bookPageReducer/SET_BOOK_DATA',
    SET_PRELOADER = 'book-searching/bookPageReducer/SET_PRELOADER',
    SET_ERROR = 'book-searching/bookPageReducer/SET_ERROR',
}

export type TInitialState = typeof initialState
export type TBookData = typeof initialState.bookData

interface SetBookData {
    type: bookPageActionTypes.SET_BOOK_DATA
    data: TBookData
}
interface SetPreloader {
    type: bookPageActionTypes.SET_PRELOADER
    status: boolean
}
interface SetErrorBookPage {
    type: bookPageActionTypes.SET_ERROR
    error: string
}

export type TBookPageAction = SetBookData | SetPreloader | SetErrorBookPage
