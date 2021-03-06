import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import products from './store/reducers/products'
import sliderReducer from './store/reducers/sliderReducer'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders'

import thunk from 'redux-thunk'
import { HashRouter } from 'react-router-dom'

const rootReducer = combineReducers({
  products: products,
  slider: sliderReducer,
  cart: cartReducer,
  order: orderReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
