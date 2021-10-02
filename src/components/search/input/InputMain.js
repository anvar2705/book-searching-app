import React from "react";
import {useForm} from "react-hook-form";

const InputMain = (props) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    const onInputChange = () => {
        props.setSearchValue(watch('searchValue'))
    }

    const onSubmit = () => {
        if (props.searchValue) {
            props.clearSearchResult()
            props.getSearchResultThunk(props.searchValue,props.paginationStep, props.startIndex)
            props.setStartIndex(props.paginationStep)
        } else
            alert('Please, fill the search field')
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} onChange={onInputChange}>
                <input {...register('searchValue')}/>
                <button type='submit'>search</button>
            </form>
        </>
    )
}

export default InputMain