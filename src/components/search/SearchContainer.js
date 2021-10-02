import React from "react";
import InputMain from "./input/InputMain";
import {connect} from "react-redux";
import {
    clearSearchResult,
    getSearchResultThunk,
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
                           startIndex={props.startIndex}
                           paginationStep={props.paginationStep}
                           setStartIndex={props.setStartIndex}
                           clearSearchResult={props.clearSearchResult}
                />
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        search: state.contentPage.search,
        startIndex: state.contentPage.startIndex,
        paginationStep: state.contentPage.paginationStep
    }
}

let mapDispatchToProps = {
    setSearchValue,
    getSearchResultThunk,
    setStartIndex,
    clearSearchResult
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)