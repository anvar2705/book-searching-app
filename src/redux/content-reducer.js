import {searchAPI} from '../api/API'

const SET_SEARCH_RESULT = 'book-searching/content-reducer/SET_SEARCH_RESULT'
const SET_SEARCH_VALUE = 'book-searching/content-reducer/SET_SEARCH_VALUE'


//Initial state

let initialState = {
    searchValue: '',
    items: [
        {
            id: "yMwGAAAAQAAJ",
            etag: "fqa9yc+SBQg",
            selfLink: "https://www.googleapis.com/books/v1/volumes/yMwGAAAAQAAJ",
            volumeInfo: {
                title: "A new dictionary English and Russian",
                authors: [
                    "Prokhor Zhdanov"
                ],
                publishedDate: "1784",
                industryIdentifiers: [
                    {
                        type: "OTHER",
                        identifier: "OXFORD:N12164544"
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 782,
                printType: "BOOK",
                categories: [
                    "English language"
                ],
                maturityRating: "NOT_MATURE",
                allowAnonLogging: false,
                contentVersion: "0.4.4.0.full.1",
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: "http://books.google.com/books/content?id=yMwGAAAAQAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    thumbnail: "http://books.google.com/books/content?id=yMwGAAAAQAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                language: "ru",
                previewLink: "http://books.google.ru/books?id=yMwGAAAAQAAJ&pg=PT485&dq=a&hl=&cd=1&source=gbs_api",
                infoLink: "https://play.google.com/store/books/details?id=yMwGAAAAQAAJ&source=gbs_api",
                canonicalVolumeLink: "https://play.google.com/store/books/details?id=yMwGAAAAQAAJ"
            },
            saleInfo: {
                country: "RU",
                saleability: "FREE",
                isEbook: true,
                buyLink: "https://play.google.com/store/books/details?id=yMwGAAAAQAAJ&rdid=book-yMwGAAAAQAAJ&rdot=1&source=gbs_api"
            },
            accessInfo: {
                country: "RU",
                viewability: "ALL_PAGES",
                embeddable: true,
                publicDomain: true,
                textToSpeechPermission: "ALLOWED",
                epub: {
                    isAvailable: false,
                    downloadLink: "http://books.google.ru/books/download/A_new_dictionary_English_and_Russian.epub?id=yMwGAAAAQAAJ&hl=&output=epub&source=gbs_api"
                },
                pdf: {
                    isAvailable: true,
                    downloadLink: "http://books.google.ru/books/download/A_new_dictionary_English_and_Russian.pdf?id=yMwGAAAAQAAJ&hl=&output=pdf&sig=ACfU3U3k4Jytvwz8GiN3PvVGojfiNRLStQ&source=gbs_api"
                },
                webReaderLink: "http://play.google.com/books/reader?id=yMwGAAAAQAAJ&hl=&printsec=frontcover&source=gbs_api",
                accessViewStatus: "FULL_PUBLIC_DOMAIN",
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: "{ Или \u003cb\u003ea\u003c/b\u003e . Ur.pinned . Cmompa to un- | f . Unpoliteness . Heyum 13 pin . с п во . \u003cb\u003ea\u003c/b\u003e . Unpinioned ( untied ) Pa3 \u003cb\u003ea\u003c/b\u003e . Unpolluted . Неоск вернень ."
            }
        }
    ]
}

//Action Creators
export const setSearchResult = (items) => ({type: SET_SEARCH_RESULT, items})
export const setSearchValue = (value) => ({type: SET_SEARCH_VALUE, value})


//Thunk Creators
export const getSearchResultThunk = (search) => async (dispatch) => {
    const response = await searchAPI.getBooks(search)
    if (response)
        console.log(response)
    // dispatch(setSearchResult(response.items))
}


//Reducer
const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.value
            }
        case SET_SEARCH_RESULT:
            return {
                ...state,
                items: action.items()
            }
        default:
            return state
    }
}

export default contentReducer
