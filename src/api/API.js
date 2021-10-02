import * as axios from "axios";

const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = 'AIzaSyBrJ7UEppQYxONnrJ4E3uQLiGQ-3mclzSI'

const instance = axios.create({
    baseURL: baseURL,
    headers: {}
})

export const searchAPI = {
    getBooks(search, paginationStep, startIndex) {
        return instance.get(`?q=${search}&key=${API_KEY}&maxResults=${paginationStep}&startIndex=${startIndex}`)
            .then(response => response.data)
    }
}