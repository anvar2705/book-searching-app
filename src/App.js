import React from "react";
import s from './App.module.scss'
import SearchContainer from "./components/search/SearchContainer";
import Content from "./components/content/СontentContainer";
import Preloader from "./components/common/preloader/Preloader";
import {connect} from "react-redux";

const App = (props) => {
    return (
        <div className={s.app}>
            {props.preloader ?
                <div className={s.app__preloader}>
                    <Preloader/>
                </div> : null}
            <SearchContainer/>
            <Content/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        preloader: state.contentPage.preloader
    }
}
export default connect(mapStateToProps, null)(App);
