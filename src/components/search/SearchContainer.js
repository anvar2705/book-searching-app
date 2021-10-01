import React from "react";
import InputMain from "./input/InputMain";
import {connect} from "react-redux";
import {getSearchResultThunk, setSearchValue} from "../../redux/content-reducer";


const Search = (props) => {
    return (
        <div>
           <InputMain searchValue={props.searchValue}
                      setSearchValue={props.setSearchValue}
                      getSearchResultThunk={props.getSearchResultThunk}

           />
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        searchValue: state.contentPage.searchValue
    }
}

let mapDispatchToProps = {
    setSearchValue,
    getSearchResultThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)