import sessionStorage from 'redux-persist/es/storage/session';
import storage from 'redux-persist/lib/storage';

export const persistConfigUser = {
    key: 'user',
    storage: sessionStorage,
    whitelist: ['user'],
};

export const persistConfigProduct = {
    key: 'product',
    storage,
    whitelist: ['isLoading'],
};

export const persistConfigApp = {
    key: "app",
    storage,
    whitelist: ['mode']
}