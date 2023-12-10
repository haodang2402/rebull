import UserSlice from './features/userSlice';
import ProductSlice from './features/productSlice';
import appSlice from './features/appSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistConfigUser, persistConfigProduct, persistConfigApp } from '../redux/persistConfig';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from './middleware/middleware';
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { testApi } from './services/test.api';

// Create Root Reducer
const _rootReducer = combineReducers({
    user: persistReducer(persistConfigUser, UserSlice),
    product: persistReducer(persistConfigProduct, ProductSlice),
    app: persistReducer(persistConfigApp, appSlice),
    [testApi.reducerPath]: testApi.reducer, // Path rtk
});

// Create Store
export const store = configureStore({
    reducer: _rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(testApi.middleware, rtkQueryErrorLogger),
});

// Apply when using refreshOnForcus and refreshOnReconnect
// setupListeners(store.dispatch)

export const persistor = persistStore(store);

export default store;
