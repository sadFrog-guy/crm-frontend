import { createApi } from '@reduxjs/toolkit/query/react';
import { Teacher } from '@/types/teachers';
import { baseQueryWithErrorHandling } from './errorHandler';
import returnUrlWithParams from '@/functions/returnUrlWithParams';

export const teacherApi = createApi({
  reducerPath: 'teacherApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Teachers'],
  endpoints: (builder) => ({
    getTeachers: builder.query<Teacher[], { id: number; type: 'branch' | 'group' }>({
      query: ({ id, type }) => ({
        url: returnUrlWithParams('teachers', id, type),
      }),
      providesTags: ['Teachers'],
    }),

    getTeacherById: builder.query<Teacher, number>({
      query: (id) => `/teachers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Teachers', id }],
    }),

    createTeacher: builder.mutation<Teacher, Partial<Teacher>>({
      query: (newTeacher) => ({
        url: '/teachers/',
        method: 'POST',
        body: newTeacher,
      }),
      invalidatesTags: ['Teachers'],
    }),

    updateTeacher: builder.mutation<Teacher, { id: number; updatedTeacher: Partial<Teacher> }>({
      query: ({ id, updatedTeacher }) => ({
        url: `/teachers/${id}/`,
        method: 'PUT',
        body: updatedTeacher,
      }),
      invalidatesTags: ['Teachers'],
    }),

    deleteTeacher: builder.mutation<void, number>({
      query: (id) => ({
        url: `/teachers/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Teachers'],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;
