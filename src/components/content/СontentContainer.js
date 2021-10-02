import React, {useEffect} from "react";
import {BookItem} from "./bookItem/BookItem";
import {connect} from "react-redux";
import s from './Сontent.module.scss'
import {getSearchResultThunk, setFetching, setStartIndex} from "../../redux/content-reducer";

const Content = (props) => {

    let bookItems = props.items.map(item => (
        <div key={item.etag}>
            <BookItem image={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : ''}
                      category={(item.volumeInfo.categories) ? item.volumeInfo.categories[0] : ''}
                      title={item.volumeInfo.title ? item.volumeInfo.title : ''}
                      authors={item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : ''}
            />
        </div>
    ))

    useEffect(() => {
        document.addEventListener('scroll', loadMore)
        return function () {
            document.removeEventListener('scroll', loadMore)
        }
    }, [])

    useEffect(() => {
        if (props.fetching && !props.stopFetching) {
            props.getSearchResultThunk(props.searchValue, props.paginationStep, props.startIndex)
            props.setStartIndex(props.startIndex + props.paginationStep)
        }
    }, [props.fetching])

    const loadMore = () => {
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom

        if ((windowRelativeBottom < document.documentElement.clientHeight + 100)) {
            props.setFetching(true)
        }

    }

    return (
        <div className={s.content}>
            {props.items[0] ?
                <div className={s.content__count}>
                    Found {props.totalItems} results
                </div> : null}
            <div className={s.content__grid}>
                {bookItems}
            </div>
        </div>
    )
}


let mapStateToProps = (state) => {
    return {
        items: state.contentPage.items,
        totalItems: state.contentPage.totalItems,
        searchValue: state.contentPage.searchValue,
        startIndex: state.contentPage.startIndex,
        paginationStep: state.contentPage.paginationStep,
        fetching: state.contentPage.fetching,
        preloader: state.contentPage.preloader,
        stopFetching: state.contentPage.stopFetching
    }
}
let mapDispatchToProps = {
    getSearchResultThunk,
    setStartIndex,
    setFetching
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)

