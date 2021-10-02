import React from "react";
import InputMain from "./input/InputMain";
import {connect} from "react-redux";
import {getSearchResultThunk, setSearchValue, setStartIndex} from "../../redux/content-reducer";
import s from "./Search.module.scss";


const Search = (props) => {
    return (
        <div className={s.search}>
            <div className={s.search__title}>
                Book Search App
            </div>
            <div className={s.search__input}>
                <InputMain searchValue={props.searchValue}
                           setSearchValue={props.setSearchValue}
                           getSearchResultThunk={props.getSearchResultThunk}
                           startIndex={props.startIndex}
                           paginationStep={props.paginationStep}
                           setStartIndex={props.setStartIndex}
                />
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        searchValue: state.contentPage.searchValue,
        startIndex: state.contentPage.startIndex,
        paginationStep: state.contentPage.paginationStep
    }
}

let mapDispatchToProps = {
    setSearchValue,
    getSearchResultThunk,
    setStartIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)