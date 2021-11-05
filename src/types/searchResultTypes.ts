export type TItems = Array<{
    etag: string
    id: string
    volumeInfo: {
        imageLinks?: {
            thumbnail?: string
        }
        categories: string[]
        title: string
        authors: string[]
    }
}>
