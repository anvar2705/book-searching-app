import axios from 'axios'
import { IParametersGetSearchResultThunk } from '../types/searchResultReducerTypes'
import { TGetBooksAPI, TGetSingleBookAPI } from '../types/APITypes'

const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = process.env.REACT_APP_API_KEY

const instance = axios.create({
    baseURL: baseURL,
    headers: {},
})

export const searchAPI = {
    getBooks(p: IParametersGetSearchResultThunk) {
        if (p.category === 'all')
            return instance.get<TGetBooksAPI>(
                `?q=${p.value}&key=${API_KEY}&maxResults=${p.paginationStep}&startIndex=${p.startIndex}&orderBy=${p.sortingBy}`
            )
        else
            return instance.get<TGetBooksAPI>(
                `?q=${p.value}+subject:${p.category}&key=${API_KEY}&maxResults=${p.paginationStep}&startIndex=${p.startIndex}&orderBy=${p.sortingBy}`
            )
    },
    getSingleBook(id: string) {
        return instance.get<TGetSingleBookAPI>(`/${id}`)
    },
}
