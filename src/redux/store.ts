import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import themeReducer from './themeSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme'], // only persist theme
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
    reducer: {
        theme: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;