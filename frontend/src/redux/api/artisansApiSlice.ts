import { apiSlice } from './apiSlice';
import { BASE_URL } from '../constants';

export const ARTISANS_URL = '/api/artisans';

export const artisansApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArtisans: builder.query({
            query: () => ({
                url: ARTISANS_URL,
            }),
            providesTags: ['Artisan'],
        }),
        getArtisanById: builder.query({
            query: (id) => ({
                url: `${ARTISANS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createArtisan: builder.mutation({
            query: (data) => ({
                url: ARTISANS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Artisan'],
        }),
        updateArtisan: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${ARTISANS_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Artisan'],
        }),
        deleteArtisan: builder.mutation({
            query: (id) => ({
                url: `${ARTISANS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Artisan'],
        }),
    }),
});

export const {
    useGetArtisansQuery,
    useGetArtisanByIdQuery,
    useCreateArtisanMutation,
    useUpdateArtisanMutation,
    useDeleteArtisanMutation,
} = artisansApiSlice;
