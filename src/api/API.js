import * as axios from 'axios'

const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = process.env.REACT_APP_API_KEY

const instance = axios.create({
    baseURL: baseURL,
    headers: {},
})

export const searchAPI = {
    getBooks(p) {
        if (p.category === 'all')
            return instance.get(
                `?q=${p.value}&key=${API_KEY}&maxResults=${p.paginationStep}&startIndex=${p.startIndex}&orderBy=${p.sortingBy}`
            )
        else
            return instance.get(
                `?q=${p.value}+subject:${p.category}&key=${API_KEY}&maxResults=${p.paginationStep}&startIndex=${p.startIndex}&orderBy=${p.sortingBy}`
            )
    },
    getSingleBook(id) {
        return instance.get(`/${id}`)
    },
}
