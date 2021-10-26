import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Search from '../search/SearchContainer'
import Preloader from '../common/preloader/Preloader'
import BookPage from '../content/bookPage/BookPage'
import SearchResult from '../content/SearchResult/SearchResultContainer'
import s from './AppContainer.module.scss'

const AppMain = (props) => {
    if (props.errorGetBooks)
        //вывод ошибок
        alert(props.errorGetBooks)
    if (props.errorGetSingleBook) alert(props.errorGetSingleBook)

    return (
        <div className={s.app}>
            {props.preloaderContent || props.preloaderBookPage ? (
                <div className={s.app__preloader}>
                    <Preloader />
                </div>
            ) : null}
            <Search />
            <div className={s.app__content}>
                <Switch>
                    <Route exact path="/" render={() => <SearchResult />} />
                    <Route path="/book:id?" render={() => <BookPage />} />
                </Switch>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        preloaderContent: state.searchResultPage.preloader,
        preloaderBookPage: state.bookPage.preloader,
        errorGetBooks: state.searchResultPage.error,
        errorGetSingleBook: state.bookPage.error,
    }
}
const AppContainer = connect(mapStateToProps, null)(AppMain)

export default AppContainer
