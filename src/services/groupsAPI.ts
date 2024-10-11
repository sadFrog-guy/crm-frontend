// @ts-nocheck
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithErrorHandling } from "./errorHandler";

import { Group } from "@/types/groups";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Groups"],
  endpoints: (builder) => ({
    getGroups: builder.query<Group[], void>({
      query: (branchId) => ({
        url: branchId ? `/groups?branch=${branchId}` : "/groups?branch=1",
      }),
      providesTags: ["Groups"],
    }),

    getGroupsById: builder.query<Group, number>({
      query: (id) => `/groups/${id}`,
    }),

    createGroup: builder.mutation<Group, Partial<Group>>({
      query: (newGroup) => ({
        url: "/groups/",
        method: "POST",
        body: newGroup,
      }),
      invalidatesTags: ["Groups"],
    }),

    updateGroup: builder.mutation<
      Group,
      { id: number; updatedGroup: Partial<Group> }
    >({
      query: ({ id, updatedGroup }) => ({
        url: `/groups/${id}/`,
        method: "PUT",
        body: updatedGroup,
      }),
      invalidatesTags: ["Groups"],
    }),

    // Удаление группы
    deleteGroup: builder.mutation<void, number>({
      query: (id) => ({
        url: `/groups/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Groups"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupsByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
