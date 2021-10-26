import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import bookPageReducer from './bookPage-reducer'
import searchResultReducer from './searchResult-reducer'

let reducers = combineReducers({
    searchResultPage: searchResultReducer,
    bookPage: bookPageReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)))

export default store

//for possibility to watch store content from console
window.store = store
