import React from "react";
import {BookItem} from "./bookItem/BookItem";
import {connect} from "react-redux";
import s from './Сontent.module.scss'

const Content = (props) => {



    let bookItems = props.items.map(item => {

        return <div key={item.id}>
            <BookItem image={item.volumeInfo.imageLinks ?
                item.volumeInfo.imageLinks.smallThumbnail : 'https://source.unsplash.com/random'}
                      category={(item.volumeInfo.categories) ? item.volumeInfo.categories[0] : 'no category'}
                      title={item.volumeInfo.title ? item.volumeInfo.title : 'no title'}
                      authors={item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'no authors'}
            />
        </div>
    })

    return (
        <div className={s.content}>
            {bookItems}
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        items: state.contentPage.items
    }
}

export default connect(mapStateToProps, null)(Content)

