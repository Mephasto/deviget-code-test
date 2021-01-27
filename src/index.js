import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import { createStore, applyMiddleware, compose } from 'redux'
import App from './components/App'
import reducer from './reducer'

const rootElement = document.getElementById('root')
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(thunk),
            persistState(null, 'state')
        )
    )

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)
