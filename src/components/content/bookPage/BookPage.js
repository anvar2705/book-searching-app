import React, {useEffect} from 'react';
import s from './BookPage.module.scss';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getBookDataThunk} from "../../../redux/bookPage-reducer";
import noImage from './../../../assets/images/noImage.png'

const BookPage = (props) => {
    let id = props.match.params.id

    let categories = props.volumeInfo.categories ? props.volumeInfo.categories.join('/') : 'no category'
    let title = props.volumeInfo.title ? props.volumeInfo.title : 'no title'
    let authors = props.volumeInfo.authors ? props.volumeInfo.authors.join(', ') : 'no authors'
    let description = props.volumeInfo.description ? props.volumeInfo.description : 'no description'
    let image
    if (props.volumeInfo.imageLinks)
        if (props.volumeInfo.imageLinks.medium)
            image = props.volumeInfo.imageLinks.medium
        else image = noImage
    else image = noImage

    useEffect(() => {
        props.getBookDataThunk(id)
    }, [])

    return (
        <div className={s.bookPage}>
            <div className={s.bookPage__image}>
                <img src={image} alt="book-image"/>
            </div>
            <div className={s.bookPage__info}>
                <div className={s.bookPage__categories}>
                    {categories}
                </div>
                <div className={s.bookPage__title}>
                    {title}
                </div>
                <div className={s.bookPage__authors}>
                    {authors}
                </div>
                <div className={s.bookPage__description}>
                    {description}
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