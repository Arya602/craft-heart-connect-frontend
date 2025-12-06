import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        // Get token from localStorage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            if (user?.token) {
                headers.set('Authorization', `Bearer ${user.token}`);
            }
        }
        return headers;
    },
    credentials: 'include', // Important for cookies
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Wishlist', 'Artisan', 'Workshop'],
    endpoints: (builder) => ({}),
});
