// redux/store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import movieReducer from './reducers/movieReducer';

const rootReducer = combineReducers({
  movie: movieReducer,
  // Agrega aquí otros reductores si los tienes
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
