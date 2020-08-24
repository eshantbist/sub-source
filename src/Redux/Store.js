//LIBRARIES
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
//ASSETS
import rootSaga from './Sagas';
import rootReducer from './Reducers'

// Middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];


export default
    createStore(
        rootReducer,
        compose(
            (applyMiddleware(...middleware))
        ));
sagaMiddleware.run(rootSaga);