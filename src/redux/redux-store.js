import React from 'react'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import searchResultReducer from './searchResult-reducer'
import thunkMiddleWare from 'redux-thunk'
import bookPageReducer from "./bookPage-reducer";


let reducers = combineReducers({
    searchResultPage: searchResultReducer,
    bookPage: bookPageReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)))


export default store


//для возможности отображения store в консоли
window.store = store