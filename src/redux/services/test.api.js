import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const testApi = createApi({
    reducerPath: 'test', // Xác Định Path Trong Store
    baseQuery: axiosBaseQuery(),
    refetchOnFocus: true, // Cho Phép Refresh Page Khi Focus Lại Trang Web
    tagTypes: ['test'], // Key để caching và validate data
    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => ({
                url: '/user',
            }),
            providesTags: (result) => {
                result
                    ? [...result.map((item) => ({ type: 'test', id: item._id })), { type: 'test', id: 'default' }]
                    : [{ type: 'test', id: 'default' }];
            },
        }),
        addTest: builder.mutation({
            query: (body) => ({
                url: '/user',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, err, body) => [{ type: 'test', id: result.id }],
        }),
    }),
});

export const { useGetTestQuery, useAddTestMutation } = testApi;
