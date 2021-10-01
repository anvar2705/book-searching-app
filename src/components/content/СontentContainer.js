import React from "react";
import {BookItem} from "./bookItem/BookItem";
import {connect} from "react-redux";
import s from './Сontent.module.scss'

const Content = (props) => {


    let bookItems = props.items.map(item => {

        return <div key={item.id}>
            <BookItem image={item.volumeInfo.imageLinks ?
                item.volumeInfo.imageLinks.smallThumbnail : ''}
                      category={(item.volumeInfo.categories) ? item.volumeInfo.categories[0] : ''}
                      title={item.volumeInfo.title ? item.volumeInfo.title : ''}
                      authors={item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : ''}
            />
        </div>
    })

    return (
        <div className={s.content}>
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
        totalItems: state.contentPage.totalItems
    }
}

export default connect(mapStateToProps, null)(Content)

