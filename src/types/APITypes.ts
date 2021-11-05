import { TItems } from './searchResultTypes'

export type TGetBooksAPI = {
    totalItems: number
    items: Array<TItems>
}

export type TGetSingleBookAPIVolumeInfo = {
    title: string
    authors: Array<string>
    description: string
    categories: Array<string>
    imageLinks: {
        medium: string
    }
}

export type TGetSingleBookAPI = {
    id: string
    etag: string
    volumeInfo: TGetSingleBookAPIVolumeInfo
    error: {
        message: string
    }
}
