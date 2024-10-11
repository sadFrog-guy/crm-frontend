// @ts-nocheck
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithErrorHandling } from "./errorHandler";

import { Branch } from "@/types/branch";

export const branchApi = createApi({
  reducerPath: "branchApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getBranches: builder.query<Branch[], void>({
      query: () => "/branches",
    }),
    getBranchById: builder.query<Branch, number>({
      query: (id) => `/branches/${id}`,
    }),
  }),
});

export const { useGetBranchesQuery, useGetBranchByIdQuery } = branchApi;
