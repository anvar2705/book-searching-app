import * as axios from "axios";

const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = 'AIzaSyCVc_mPrcF2fNFlzHh6Pf_a-z9U21VQBFc'    //AIzaSyD8ikw10csgqmcNAKeOb6RgMiqYATmnrSg


const instance = axios.create({
    baseURL: baseURL,
    headers: {}
})

export const searchAPI = {
    getBooks(value, paginationStep, startIndex, sortingBy) {
        return instance.get(`?q=intitle:${value}&key=${API_KEY}&maxResults=${paginationStep}&startIndex=${startIndex}&orderBy=${sortingBy}`)
    }
}