import { apiSlice } from './apiSlice';

const SELLER_URL = '/api/seller';

export const sellerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        requestSellerRole: builder.mutation({
            query: (data) => ({
                url: `${SELLER_URL}/request`,
                method: 'POST',
                body: data,
            }),
        }),
        getSellerStatus: builder.query({
            query: () => ({
                url: `${SELLER_URL}/status`,
            }),
        }),
    }),
});

export const {
    useRequestSellerRoleMutation,
    useGetSellerStatusQuery,
} = sellerApiSlice;
