import React from 'react'
import InputMain from './input/InputMain'
import s from './Search.module.scss'

const Search = (props) => {
    return (
        <div className={s.search}>
            <div className={s.search__title}>Book Search App</div>
            <div className={s.search__input}>
                <InputMain />
            </div>
        </div>
    )
}

export default Search
