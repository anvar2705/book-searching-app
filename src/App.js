import React from 'react'
import { HashRouter } from 'react-router-dom'
import store from './redux/redux-store'
import { Provider } from 'react-redux'
import AppContainer from './components/app/AppContainer'

const App = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    )
}

export default App
