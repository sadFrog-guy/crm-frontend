import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithErrorHandling } from "./errorHandler";

import { Finance } from "@/types/finances";
import returnUrlWithParams from "@/functions/returnUrlWithParams";

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Finances"],
  endpoints: (builder) => ({
    getFinances: builder.query<
      Finance[],
      { id: number; type: "branch" | "teacher" | "student" }
    >({
      query: ({ id, type }) => ({
        url: returnUrlWithParams("finance-records", id, type),
      }),
      providesTags: ["Finances"],
    }),

    getFinanceById: builder.query<Finance, number>({
      query: (id) => `/finance-records/${id}`,
      providesTags: (result, error, id) => [{ type: "Finances", id }],
    }),

    createFinance: builder.mutation<Finance, Partial<Finance>>({
      query: (newFinance) => ({
        url: "/finance-records/",
        method: "POST",
        body: newFinance,
      }),
      invalidatesTags: ["Finances"],
    }),

    updateFinance: builder.mutation<
      Finance,
      { id: number; updatedFinance: Partial<Finance> }
    >({
      query: ({ id, updatedFinance }) => ({
        url: `/finance-records/${id}/`,
        method: "PUT",
        body: updatedFinance,
      }),
      invalidatesTags: ["Finances"],
    }),

    deleteFinance: builder.mutation<void, number>({
      query: (id) => ({
        url: `/finance-records/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Finances"],
    }),
  }),
});

export const {
  useGetFinancesQuery,
  useGetFinanceByIdQuery,
  useCreateFinanceMutation,
  useUpdateFinanceMutation,
  useDeleteFinanceMutation,
} = financeApi;
