import { apiSlice } from './apiSlice';

const ANALYTICS_URL = '/api/analytics';

export const analyticsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSalesData: builder.query({
            query: () => ({
                url: `${ANALYTICS_URL}/sales`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetSalesDataQuery } = analyticsApiSlice;
