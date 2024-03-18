import createSagaMiddleware from '@redux-saga/core';
import { UserSlice } from '../features/UserSlice';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import { persistStore, persistReducer } from 'redux-persist';
import persistConfig from './persist';

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, UserSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['user/uploadImageRequest'],
        ignoredActionPaths: ['payload.file'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
