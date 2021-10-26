import React from 'react'
import { useForm } from 'react-hook-form'
import s from './InputMain.module.scss'
import { InputCustom } from '../../common/inputCustom/InputCustom'
import { ButtonCustom } from '../../common/buttonCustom/ButtonCustom'
import { useHistory } from 'react-router-dom'

const InputMain = (props) => {
    let value = props.search.value
    let category = props.search.category
    let sortingBy = props.search.sortingBy
    let paginationStep = props.paginationStep
    const history = useHistory()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onInputChange = () => {
        props.setSearchValue(watch('value'), watch('category'), watch('sortingBy'))
    }

    const onSubmit = () => {
        if (value) {
            props.clearSearchResult()
            history.push('/')

            props.getSearchResultThunk(value, paginationStep, 0, sortingBy, category)
            props.setStartIndex(paginationStep)
        } else alert('Please, fill the search field')
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} onChange={onInputChange} className={s.form}>
                <div className={s.form__field}>
                    <div className={s.form__input}>
                        <InputCustom {...register('value')}>Search books</InputCustom>
                    </div>
                    <div className={s.form__btn}>
                        <ButtonCustom>search</ButtonCustom>
                    </div>
                </div>
                <div className={s.form__selects}>
                    <div className={s.form__selectItem}>
                        <label htmlFor="category">Categories</label>
                        <select {...register('category')} defaultValue="all" id="category">
                            <option value="all">all</option>
                            <option value="art">art</option>
                            <option value="biography">biography</option>
                            <option value="computers">computers</option>
                            <option value="history">history</option>
                            <option value="medical">medical</option>
                            <option value="poetry">poetry</option>
                        </select>
                    </div>
                    <div className={s.form__selectItem}>
                        <label htmlFor="sortingBy">Sorting by</label>
                        <select {...register('sortingBy')} defaultValue="relevance" id="sortingBy">
                            <option value="relevance">relevance</option>
                            <option value="newest">newest</option>
                        </select>
                    </div>
                </div>
            </form>
        </>
    )
}

export default InputMain
