import React from 'react';
import s from './BookItem.module.scss';

export const BookItem = (props) => {

    return (
        <div className={s.bookItem}>
            <div className={s.bookItem__wrapper}>
                <div className={s.bookItem__info}>
                    <div className={s.bookItem__image}>
                        <img src={props.image} alt='book-image'/>
                    </div>
                    <div className={s.bookItem__authors}>
                        {props.authors}
                    </div>
                    <div className={s.bookItem__title}>
                        {props.title}
                    </div>
                </div>
                <div className={s.bookItem__categories}>
                    {props.category}
                </div>
            </div>
        </div>
    )
}
