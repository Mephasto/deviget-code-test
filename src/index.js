import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import persistState from 'redux-localstorage'
import App from './App'
import reducer from './reducer'
import store from './store'
console.log(store.getState())

const rootElement = document.getElementById('root')

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)
