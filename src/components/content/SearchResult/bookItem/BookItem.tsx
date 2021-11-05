import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './BookItem.module.scss'
import { TBookItemProps } from '../../../../types/bookItemTypes'

export const BookItem: FC<TBookItemProps> = ({ image, category, title, authors, id }) => {
    let titleBookItem
    let authorsBookItem

    if (title.length < 58) titleBookItem = title
    else titleBookItem = title.slice(0, 58) + '...'

    if (authors.length < 80) authorsBookItem = authors
    else authorsBookItem = authors.slice(0, 80) + '...'

    return (
        <>
            <NavLink to={'/book' + id} className={s.link}>
                <div className={s.bookItem}>
                    <div className={s.bookItem__wrapper}>
                        <div className={s.bookItem__info}>
                            <div className={s.bookItem__image}>
                                <img src={image} alt="template" />
                            </div>
                            <div className={s.bookItem__authors}>{authorsBookItem}</div>
                            <div className={s.bookItem__title}>{titleBookItem}</div>
                        </div>
                        <div className={s.bookItem__categories}>{category}</div>
                    </div>
                </div>
            </NavLink>
        </>
    )
}
