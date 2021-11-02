import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { InputCustom } from '../../common/inputCustom/InputCustom'
import { ButtonCustom } from '../../common/buttonCustom/ButtonCustom'
import {
    clearSearchResult,
    getSearchResultThunk,
    setFetching,
    setPreloader,
    setSearchValue,
    setStartIndex,
} from '../../../redux/searchResultReducer'
import { connect } from 'react-redux'
import s from './InputMain.module.scss'

const InputMain = (props) => {
    let { value, category, sortingBy } = props.search
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

            let parameters = {
                value: value,
                paginationStep: paginationStep,
                startIndex: 0,
                sortingBy: sortingBy,
                category: category,
            }

            props.getSearchResultThunk(parameters)
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

let mapStateToProps = (state) => {
    return {
        search: state.searchResultPage.search,
        startIndex: state.searchResultPage.startIndex,
        paginationStep: state.searchResultPage.paginationStep,
        stopFetching: state.searchResultPage.stopFetching,
    }
}

let mapDispatchToProps = {
    setSearchValue,
    getSearchResultThunk,
    setStartIndex,
    clearSearchResult,
    setPreloader,
    setFetching,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputMain)
