import { apiSlice } from './apiSlice';
import { REPORTS_URL } from '../constants';

export const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createReport: builder.mutation({
            query: (data) => ({
                url: REPORTS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        getReports: builder.query({
            query: () => ({
                url: REPORTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        updateReportStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `${REPORTS_URL}/${id}`,
                method: 'PUT',
                body: { status },
            }),
        }),
    }),
});

export const {
    useCreateReportMutation,
    useGetReportsQuery,
    useUpdateReportStatusMutation,
} = reportsApiSlice;
