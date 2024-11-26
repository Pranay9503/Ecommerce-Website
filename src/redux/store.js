import { applyMiddleware,legacy_createStore } from 'redux';
import cartReducer from './ecReducer';
import {thunk} from 'redux-thunk';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    cartReducer
})

const middleware = [thunk];

const store = legacy_createStore(rootReducer,applyMiddleware(...middleware));

export default store;
