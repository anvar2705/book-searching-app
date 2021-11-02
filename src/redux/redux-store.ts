import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import { bookPageReducer } from './bookPage-reducer'
import { searchResultReducer } from './searchResult-reducer'

let rootReducer = combineReducers({
    searchResultPage: searchResultReducer,
    bookPage: bookPageReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))

export default store

// for possibility to watch store content from console
// @ts-ignore
// window.store = store
