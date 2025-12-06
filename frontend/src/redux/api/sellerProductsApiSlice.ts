import { apiSlice } from './apiSlice';

const PRODUCTS_URL = '/api/products';

export const sellerProductsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/seller/my-products`,
            }),
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: PRODUCTS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetMyProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = sellerProductsApiSlice;
