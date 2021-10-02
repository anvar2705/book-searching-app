import React from "react";
import {BookItem} from "./bookItem/BookItem";
import {connect} from "react-redux";
import s from './Сontent.module.scss'
import Preloader from "../common/preloader/Preloader";

const Content = (props) => {

    let bookItems = props.items.map(item => (
        <div key={item.id}>
            <BookItem image={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : ''}
                      category={(item.volumeInfo.categories) ? item.volumeInfo.categories[0] : ''}
                      title={item.volumeInfo.title ? item.volumeInfo.title : ''}
                      authors={item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : ''}
            />
        </div>
    ))

    const loadMore = () => {
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom

        if (windowRelativeBottom < document.documentElement.clientHeight + 100)
            console.log('loadMore')
    }

    loadMore()

    return (
        <div className={s.content}>
            {props.loading ? <Preloader/> : null}
            {props.totalItems ?
                <div className={s.content__count}>
                    Found {props.totalItems} results
                </div> :
                null}
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
        loading: state.contentPage.loading
    }
}

export default connect(mapStateToProps, null)(Content)

