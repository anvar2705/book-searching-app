import React from "react";
import {useForm} from "react-hook-form";

const InputMain = (props) => {
    let value = props.search.value
    let category = props.search.category
    let sortingBy = props.search.sortingBy

    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    const onInputChange = () => {
        props.setSearchValue(watch('value'), watch('category'), watch('sortingBy'))
    }

    const onSubmit = () => {
        if (value) {
            props.clearSearchResult()
            props.getSearchResultThunk(value, props.paginationStep, 0, sortingBy)
            props.setStartIndex(props.paginationStep)
        } else
            alert('Please, fill the search field')
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} onChange={onInputChange}>
                <input {...register('value')}/>
                <button type='submit'>search</button>
                <select {...register('category')} defaultValue='all'>
                    <option value="all">all</option>
                    <option value="art">art</option>
                    <option value="biography">biography</option>
                    <option value="computers">computers</option>
                    <option value="history">history</option>
                    <option value="medical">medical</option>
                    <option value="poetry">poetry</option>
                </select>
                <select {...register('sortingBy')} defaultValue='relevance'>
                    <option value="relevance">relevance </option>
                    <option value="newest">newest</option>
                </select>
            </form>
        </>
    )
}

export default InputMain