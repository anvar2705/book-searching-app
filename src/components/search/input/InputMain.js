import React from "react";
import {useForm} from "react-hook-form";
import s from './InputMain.module.scss'
import {InputCustom} from "../../common/inputCustom/InputCustom";
import {ButtonCustom} from "../../common/buttonCustom/ButtonCustom";

const InputMain = (props) => {
    let value = props.search.value
    let category = props.search.category
    let sortingBy = props.search.sortingBy
    let paginationStep = props.paginationStep

    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    const onInputChange = () => {
        props.setSearchValue(watch('value'), watch('category'), watch('sortingBy'))
    }

    const onSubmit = () => {
        if (value) {
            props.clearSearchResult()
            props.getSearchResultThunk(value, paginationStep, 0, sortingBy, category)
            props.setStartIndex(paginationStep)
        } else
            alert('Please, fill the search field')
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} onChange={onInputChange} className={s.form}>
                <div className={s.form__input}>
                    <InputCustom {...register('value')}>Search books</InputCustom>
                </div>
                <div className={s.form__btn}>
                    <ButtonCustom>search</ButtonCustom>

                </div>
                <select {...register('category')} defaultValue='all' className={s.form__category}>
                    <option value="all">all</option>
                    <option value="art">art</option>
                    <option value="biography">biography</option>
                    <option value="computers">computers</option>
                    <option value="history">history</option>
                    <option value="medical">medical</option>
                    <option value="poetry">poetry</option>
                </select>
                <select {...register('sortingBy')} defaultValue='relevance' className={s.form__sorting}>
                    <option value="relevance">relevance</option>
                    <option value="newest">newest</option>
                </select>
            </form>
        </>
    )
}

export default InputMain