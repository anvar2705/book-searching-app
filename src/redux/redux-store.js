import React from 'react'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import contentReducer from './content-reducer'
import thunkMiddleWare from 'redux-thunk'


let reducers = combineReducers({
    contentPage: contentReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleWare))

export default store


//для возможности отображения store в консоли
window.store = store