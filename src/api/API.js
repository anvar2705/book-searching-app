import * as axios from "axios";

const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = 'AIzaSyBrJ7UEppQYxONnrJ4E3uQLiGQ-3mclzSI'

const instance = axios.create({
    baseURL: baseURL,
    headers: {}
})

export const searchAPI = {
    getBooks(value, paginationStep, startIndex, sortingBy) {
        return instance.get(`?q=intitle:${value}&key=${API_KEY}&maxResults=${paginationStep}&startIndex=${startIndex}&orderBy=${sortingBy}`)
    }
}