import { createApi } from '@reduxjs/toolkit/query/react';
import { Branch } from '@/types/branch';
import { baseQueryWithErrorHandling } from './errorHandler';

export const branchApi = createApi({
  reducerPath: 'branchApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getBranches: builder.query<Branch[], void>({
      query: () => '/branches',
    }),
    getBranchById: builder.query<Branch, number>({
      query: (id) => `/branches/${id}`,
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useGetBranchByIdQuery,
} = branchApi;