// rootReducer.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/redux/authReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import shoppingReducer from './redux/shoppingReducer';
import  cartCountSlice  from './redux/cartCountReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  shopping: shoppingReducer,
  cartCount: cartCountSlice 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
