import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BookItem } from './bookItem/BookItem'
import {
    getSearchResultThunk,
    setFetching,
    setStartIndex,
} from '../../../redux/searchResult-reducer'
import s from './SearchResult.module.scss'

const SeacrhResult = (props) => {
    let { value, category, sortingBy } = props.search

    let bookItems = props.items.map((item) => (
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
            props.setFetching(true)
        }
    }

    useEffect(() => {
        if (props.fetching && !props.stopFetching) {
            let parameters = {
                value: value,
                category: category,
                sortingBy: sortingBy,
                paginationStep: props.paginationStep,
                startIndex: props.startIndex,
            }

            props.getSearchResultThunk(parameters)
            props.setStartIndex(props.startIndex + props.paginationStep)
        }
    }, [props.fetching])

    return (
        <div className={s.searchResult}>
            {props.searchFinished ? (
                <div className={s.searchResult__count}>Found {props.totalItems} results</div>
            ) : null}
            <div className={s.searchResult__grid}>{bookItems}</div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        items: state.searchResultPage.items,
        totalItems: state.searchResultPage.totalItems,
        search: state.searchResultPage.search,
        startIndex: state.searchResultPage.startIndex,
        paginationStep: state.searchResultPage.paginationStep,
        fetching: state.searchResultPage.fetching,
        preloader: state.searchResultPage.preloader,
        stopFetching: state.searchResultPage.stopFetching,
        searchFinished: state.searchResultPage.searchFinished,
    }
}
let mapDispatchToProps = {
    getSearchResultThunk,
    setStartIndex,
    setFetching,
}

export default connect(mapStateToProps, mapDispatchToProps)(SeacrhResult)
