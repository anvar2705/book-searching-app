import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import Search from '../search/SearchContainer'
import Preloader from '../common/preloader/Preloader'
import BookPage from '../content/bookPage/BookPage'
import SearchResult from '../content/SearchResult/SearchResult'
import s from './AppMain.module.scss'
import { useTypedSelector } from '../../hooks/hooks'

const AppMain: FC = (props) => {
    const preloaderContent = useTypedSelector((state) => state.searchResultPage.preloader)
    const errorGetBooks = useTypedSelector((state) => state.searchResultPage.error)
    const preloaderBookPage = useTypedSelector((state) => state.bookPage.preloader)
    const errorGetSingleBook = useTypedSelector((state) => state.bookPage.error)

    if (errorGetBooks)
        //вывод ошибок
        alert(errorGetBooks)
    if (errorGetSingleBook) alert(errorGetSingleBook)

    return (
        <div className={s.app}>
            {preloaderContent || preloaderBookPage ? (
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

export default AppMain
