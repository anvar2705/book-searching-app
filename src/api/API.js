import * as axios from "axios";

const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
    baseURL: baseURL,
    headers: {}
})

export const searchAPI = {
    getBooks(value, paginationStep, startIndex, sortingBy, category) {
        if (category === 'all')
            return instance.get(`?q=${value}&key=${API_KEY}&maxResults=${paginationStep}&startIndex=${startIndex}&orderBy=${sortingBy}`)
        else
            return instance.get(`?q=${value}+subject:${category}&key=${API_KEY}&maxResults=${paginationStep}&startIndex=${startIndex}&orderBy=${sortingBy}`)
    },
    getSingleBook(id) {
        return instance.get(`/${id}`)
    }
}