import React from 'react'
import InputMain from './input/InputMain'
import { connect } from 'react-redux'
import {
    clearSearchResult,
    getSearchResultThunk,
    setFetching,
    setPreloader,
    setSearchValue,
    setStartIndex,
} from '../../redux/searchResult-reducer'
import s from './Search.module.scss'

const Search = (props) => {
    return (
        <div className={s.search}>
            <div className={s.search__title}>Book Search App</div>
            <div className={s.search__input}>
                <InputMain
                    search={props.search}
                    setSearchValue={props.setSearchValue}
                    getSearchResultThunk={props.getSearchResultThunk}
                    startIndex={props.startIndex}
                    paginationStep={props.paginationStep}
                    setStartIndex={props.setStartIndex}
                    clearSearchResult={props.clearSearchResult}
                    setPreloader={props.setPreloader}
                    setFetching={props.setFetching}
                    stopFetching={props.stopFetching}
                />
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
