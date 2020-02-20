import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderreducer from './store/reducers/burgerBuilder';
import orderReducers from './store/reducers/order';
import thunk from 'redux-thunk';
import authReducers from './store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers({
    burgerIngredients: burgerBuilderreducer,
    order: orderReducers,
    auth: authReducers
});
const store = createStore(rootReducers, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
