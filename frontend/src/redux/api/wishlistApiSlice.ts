import { apiSlice } from './apiSlice';

const WISHLIST_URL = '/api/wishlist';

export const wishlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => ({
                url: WISHLIST_URL,
            }),
            providesTags: ['Wishlist'],
            keepUnusedDataFor: 5,
        }),
        addToWishlist: builder.mutation({
            query: (productId) => ({
                url: `${WISHLIST_URL}/${productId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Wishlist'],
        }),
        removeFromWishlist: builder.mutation({
            query: (productId) => ({
                url: `${WISHLIST_URL}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
        }),
    }),
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
} = wishlistApiSlice;
