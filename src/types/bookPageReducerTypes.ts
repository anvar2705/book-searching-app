import { initialState } from '../redux/bookPageReducer'

export enum bookPageActionTypes {
    SET_BOOK_DATA = 'book-searching/bookPageReducer/SET_BOOK_DATA',
    SET_PRELOADER = 'book-searching/bookPageReducer/SET_PRELOADER',
    SET_ERROR = 'book-searching/bookPageReducer/SET_ERROR',
}

export type TInitialState = typeof initialState
export type TBookData = typeof initialState.bookData

interface ISetBookData {
    type: bookPageActionTypes.SET_BOOK_DATA
    data: TBookData
}
interface ISetPreloader {
    type: bookPageActionTypes.SET_PRELOADER
    status: boolean
}
interface ISetErrorBookPage {
    type: bookPageActionTypes.SET_ERROR
    error: string
}

export type TBookPageAction = ISetBookData | ISetPreloader | ISetErrorBookPage
