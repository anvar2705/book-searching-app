import * as axios from "axios";

const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = 'AIzaSyBrJ7UEppQYxONnrJ4E3uQLiGQ-3mclzSI'

const instance = axios.create({
    baseURL: baseURL,
    headers: {}
})

export const searchAPI = {
    getBooks(search) {
        return instance.get(`?q=${search}&key=${API_KEY}&maxResults=${30}`)
            .then(response => response.data)
    }
}