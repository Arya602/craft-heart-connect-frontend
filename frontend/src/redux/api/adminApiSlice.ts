import { apiSlice } from './apiSlice';

const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/users`,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${ADMIN_URL}/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${ADMIN_URL}/users/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: ({ userId, ...data }) => ({
                url: `${ADMIN_URL}/users/${userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/orders`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateOrderStatus: builder.mutation({
            query: ({ orderId, ...data }) => ({
                url: `${ADMIN_URL}/orders/${orderId}`,
                method: 'PUT',
                body: data,
            }),
        }),
        getSellerRequests: builder.query({
            query: (status = 'all') => ({
                url: `${ADMIN_URL}/seller-requests?status=${status}`,
            }),
            providesTags: ['User'],
        }),
        approveSellerRequest: builder.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}/seller-requests/${id}/approve`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        rejectSellerRequest: builder.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}/seller-requests/${id}/reject`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserDetailsQuery,
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation,
    useGetSellerRequestsQuery,
    useApproveSellerRequestMutation,
    useRejectSellerRequestMutation,
} = adminApiSlice;
