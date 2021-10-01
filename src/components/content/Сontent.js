import React from "react";
import {BookItem} from "./bookItem/BookItem";
import {connect} from "react-redux";

const Content = (props) => {

    let bookItems = props.items.map(item => (
        <div key={item.id}>
            <BookItem image={item.volumeInfo.imageLinks.smallThumbnail}
                      categories={item.volumeInfo.categories}
                      title={item.volumeInfo.title}
                      authors={item.volumeInfo.authors}
            />
        </div>
    ))

    return (
        <div>
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

