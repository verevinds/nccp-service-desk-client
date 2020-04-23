import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { CombineReducers } from './reducer';
import { watchFetch } from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(CombineReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchFetch);

export default store;
