import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BookItem } from './bookItem/BookItem'
import {
    getSearchResultThunk,
    setFetching,
    setStartIndex,
} from '../../../redux/searchResultReducer'
import { useTypedSelector } from '../../../hooks/hooks'
import s from './SearchResult.module.scss'

const SeacrhResult: FC = () => {
    const searchResultPage = useTypedSelector((state) => state.searchResultPage)
    const {
        items,
        totalItems,
        search,
        startIndex,
        paginationStep,
        fetching,
        stopFetching,
        searchFinished,
    } = searchResultPage
    const { value, category, sortingBy } = search

    const dispatch = useDispatch()

    let bookItems = items.map((item) => (
        <div key={item.etag}>
            <BookItem
                image={item.volumeInfo?.imageLinks?.thumbnail}
                category={item.volumeInfo.categories ? item.volumeInfo.categories[0] : ''}
                title={item.volumeInfo.title ? item.volumeInfo.title : ''}
                authors={item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : ''}
                id={item.id}
            />
        </div>
    ))

    useEffect(() => {
        document.addEventListener('scroll', loadMore)
        return function () {
            document.removeEventListener('scroll', loadMore)
        }
    }, [])
    const loadMore = () => {
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom

        if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
            dispatch(setFetching(true))
        }
    }

    useEffect(() => {
        if (fetching && !stopFetching) {
            let parameters = {
                value: value,
                category: category,
                sortingBy: sortingBy,
                paginationStep: paginationStep,
                startIndex: startIndex,
            }

            dispatch(getSearchResultThunk(parameters))
            dispatch(setStartIndex(startIndex + paginationStep))
        }
    }, [fetching])

    return (
        <div className={s.searchResult}>
            {searchFinished ? (
                <div className={s.searchResult__count}>Found {totalItems} results</div>
            ) : null}
            <div className={s.searchResult__grid}>{bookItems}</div>
        </div>
    )
}

export default SeacrhResult
