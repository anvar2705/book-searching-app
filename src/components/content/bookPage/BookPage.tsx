import React, { FC, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { compose } from 'redux'
import { getBookDataThunk } from '../../../redux/bookPageReducer'
import noImage from './../../../assets/images/noImage.png'
import s from './BookPage.module.scss'
import { TBookPageProps } from '../../../types/bookPageTypes'
import { useTypedSelector } from '../../../hooks/hooks'

const BookPage: FC<TBookPageProps> = (props) => {
    let id = props.match.params.id

    const volumeInfo = useTypedSelector((state) => state.bookPage.bookData.volumeInfo)

    const dispatch = useDispatch()

    let categories = volumeInfo.categories ? volumeInfo.categories.join('/') : 'no category'
    let title = volumeInfo.title ? volumeInfo.title : 'no title'
    let authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'no authors'
    let description = volumeInfo.description ? volumeInfo.description : 'no description'
    let image
    if (volumeInfo.imageLinks)
        if (volumeInfo.imageLinks.medium) image = volumeInfo.imageLinks.medium
        else image = noImage
    else image = noImage

    useEffect(() => {
        dispatch(getBookDataThunk(id))
    }, [])

    return (
        <div className={s.bookPage}>
            <div className={s.bookPage__image}>
                <img src={image} alt="book-image" />
            </div>
            <div className={s.bookPage__info}>
                <div className={s.bookPage__categories}>{categories}</div>
                <div className={s.bookPage__title}>{title}</div>
                <div className={s.bookPage__authors}>{authors}</div>
                <div className={s.bookPage__description}>{description}</div>
            </div>
        </div>
    )
}

export default compose(withRouter)(BookPage)
