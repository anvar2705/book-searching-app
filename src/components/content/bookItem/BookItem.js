import React from 'react';
import s from './BookItem.module.css';

export const BookItem = (props) => {

    let category = props.categories[0]
    let authors = props.authors.join(', ')

    return (
        <div className={s.bookItem}>
            <div className={s.bookItem__image}>
                <img src={props.image} alt='book-image'/>
            </div>
            <div className={s.bookItem__categories}>
                {category}
            </div>
            <div className={s.bookItem__title}>
                {props.title}
            </div>
            <div className={s.bookItem__authors}>
                {authors}
            </div>
        </div>
    )
}
