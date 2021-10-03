import React from "react";
import s from './App.module.scss'
import SearchContainer from "./components/search/SearchContainer";
import Content from "./components/content/СontentContainer";
import Preloader from "./components/common/preloader/Preloader";
import {connect, Provider} from "react-redux";
import {HashRouter, Route, Switch} from "react-router-dom";
import store from "./redux/redux-store";
import BookPage from "./components/bookPage/BookPage";


const App = (props) => {
    return (
        <div className={s.app}>
            {(props.preloaderContent || props.preloaderBookPage) ?
                <div className={s.app__preloader}>
                    <Preloader/>
                </div> : null}
            <SearchContainer/>
            <div className={s.app__content}>
                <Switch>
                    <Route exact path='/'
                           render={() => (<Content/>)}
                    />
                    <Route path='/book:id?'
                           render={() => (<BookPage/>)}
                    />
                </Switch>

            </div>

        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        preloaderContent: state.contentPage.preloader,
        preloaderBookPage: state.bookPage.preloader
    }
}
const AppContainer = connect(mapStateToProps, null)(App);

const AppMain = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}

export default AppMain