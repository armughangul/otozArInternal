import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import AppReducer from './Reducers/AppReducer';

const reducers = combineReducers({
  appReducer : AppReducer
});
export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const persistor = persistStore(store);
