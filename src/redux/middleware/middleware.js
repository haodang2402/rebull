import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.warn('We got a rejected action!');
        toast.warn({ title: 'Async error!', message: action.error.data.message });
    }

    return next(action);
};
