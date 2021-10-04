import React, {useEffect} from 'react';
import s from './BookPage.module.scss';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getBookDataThunk} from "../../redux/bookPage-reducer";

const BookPage = (props) => {
    let id = props.match.params.id

    let categories = props.volumeInfo.categories.join('/')
    let title = props.volumeInfo.title
    let authors = props.volumeInfo.authors.join(', ')
    let description = props.volumeInfo.description
    let image = props.volumeInfo.imageLinks.medium

    useEffect(() => {
        props.getBookDataThunk(id)
    }, [])

    return (
        <div className={s.bookPage}>
            <div className={s.bookPage__image}>
                <img src={image ? image : './../../assets/images/no-image.png'} alt="book-image"/>
            </div>
            <div className={s.bookPage__info}>
                <div className={s.bookPage__categories}>
                    {categories ? categories : 'no category'}
                </div>
                <div className={s.bookPage__title}>
                    {title ? title : 'no title'}
                </div>
                <div className={s.bookPage__authors}>
                    {authors ? authors : 'no authors'}
                </div>
                <div className={s.bookPage__description}>
                    {description ? description : 'no description'}
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        volumeInfo: state.bookPage.bookData.volumeInfo
    }
}
let mapDispatchToProps = {
    getBookDataThunk
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(BookPage)