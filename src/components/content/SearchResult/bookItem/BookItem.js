import React from 'react'
import s from './BookItem.module.scss'
import { NavLink } from 'react-router-dom'

export const BookItem = (props) => {
    let title

    if (props.title.length < 58) title = props.title
    else title = props.title.slice(0, 58) + '...'

    let authors
    if (props.authors.length < 80) authors = props.authors
    else authors = props.authors.slice(0, 80) + '...'

    return (
        <>
            <NavLink to={'/book' + props.id} className={s.link}>
                <div className={s.bookItem}>
                    <div className={s.bookItem__wrapper}>
                        <div className={s.bookItem__info}>
                            <div className={s.bookItem__image}>
                                <img src={props.image} />
                            </div>
                            <div className={s.bookItem__authors}>{authors}</div>
                            <div className={s.bookItem__title}>{title}</div>
                        </div>
                        <div className={s.bookItem__categories}>{props.category}</div>
                    </div>
                </div>
            </NavLink>
        </>
    )
}
