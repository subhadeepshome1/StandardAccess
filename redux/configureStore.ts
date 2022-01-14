import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { StoreState } from '../models/reduxModels';
import thunk from 'redux-thunk';


export default function ConfigureStore(initialState?: StoreState) {
    return createStore( rootReducer, initialState, applyMiddleware(thunk) )
}