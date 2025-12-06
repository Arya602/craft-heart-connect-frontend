import { apiSlice } from './apiSlice';

const ORDERS_URL = '/api/orders';

export const sellerOrdersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSellerOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/seller/my-orders`,
            }),
            providesTags: ['Order'],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `${ORDERS_URL}/${id}/status`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useGetSellerOrdersQuery,
    useUpdateOrderStatusMutation,
} = sellerOrdersApiSlice;
