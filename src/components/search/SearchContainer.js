import React from "react";
import InputMain from "./input/InputMain";
import {connect} from "react-redux";
import {
    clearSearchResult, getSearchResultFilteredThunk,
    getSearchResultThunk, setFetching, setPreloader,
    setSearchValue,
    setStartIndex
} from "../../redux/content-reducer";
import s from "./Search.module.scss";


const Search = (props) => {

    return (
        <div className={s.search}>
            <div className={s.search__title}>
                Book Search App
            </div>
            <div className={s.search__input}>
                <InputMain search={props.search}
                           setSearchValue={props.setSearchValue}
                           getSearchResultThunk={props.getSearchResultThunk}
                           getSearchResultFilteredThunk={props.getSearchResultFilteredThunk}
                           startIndex={props.startIndex}
                           paginationStep={props.paginationStep}
                           setStartIndex={props.setStartIndex}
                           clearSearchResult={props.clearSearchResult}
                           setPreloader={props.setPreloader}
                           setFetching={props.setFetching}
                           items={props.items}
                           stopFetching={props.stopFetching}
                />
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        search: state.contentPage.search,
        startIndex: state.contentPage.startIndex,
        paginationStep: state.contentPage.paginationStep,
        items: state.contentPage.items,
        stopFetching: state.contentPage.stopFetching
    }
}

let mapDispatchToProps = {
    setSearchValue,
    getSearchResultThunk,
    getSearchResultFilteredThunk,
    setStartIndex,
    clearSearchResult,
    setPreloader,
    setFetching
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)