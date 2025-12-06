import { apiSlice } from './apiSlice';

const UPLOAD_URL = '/api/products/upload';

export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useUploadProductImageMutation } = uploadApiSlice;
