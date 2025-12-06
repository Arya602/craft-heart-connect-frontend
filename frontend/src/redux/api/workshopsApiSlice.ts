import { apiSlice } from './apiSlice';
import { BASE_URL } from '../constants';

export const WORKSHOPS_URL = '/api/workshops';

export const workshopsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWorkshops: builder.query({
            query: () => ({
                url: WORKSHOPS_URL,
            }),
            providesTags: ['Workshop'],
        }),
        getWorkshopById: builder.query({
            query: (id) => ({
                url: `${WORKSHOPS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createWorkshop: builder.mutation({
            query: (data) => ({
                url: WORKSHOPS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Workshop'],
        }),
        updateWorkshop: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${WORKSHOPS_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Workshop'],
        }),
        deleteWorkshop: builder.mutation({
            query: (id) => ({
                url: `${WORKSHOPS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Workshop'],
        }),
        registerForWorkshop: builder.mutation({
            query: (id) => ({
                url: `${WORKSHOPS_URL}/${id}/register`,
                method: 'POST',
            }),
            invalidatesTags: ['Workshop'],
        }),
    }),
});

export const {
    useGetWorkshopsQuery,
    useGetWorkshopByIdQuery,
    useCreateWorkshopMutation,
    useUpdateWorkshopMutation,
    useDeleteWorkshopMutation,
    useRegisterForWorkshopMutation,
} = workshopsApiSlice;
