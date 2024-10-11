import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './errorHandler';
import returnUrlWithParams from '@/functions/returnUrlWithParams';
import { Attendance } from '@/types/attendance';

export const attendancesApi = createApi({
  reducerPath: 'attendancesApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Attendances'],
  endpoints: (builder) => ({
    getAttendances: builder.query<Attendance[], { id: number; type: 'branch' | 'group' | 'student' | 'lesson' }>({
      query: ({ id, type }) => ({
        url: returnUrlWithParams('attendances', id, type),
      }),
      providesTags: ['Attendances'],
    }),

    getAttendanceById: builder.query<Attendance, number>({
      query: (id) => `/attendances/${id}`,
      providesTags: (result, error, id) => [{ type: 'Attendances', id }],
    }),

    createAttendance: builder.mutation<Attendance, Partial<Attendance>>({
      query: (newAttendance) => ({
        url: '/attendances/',
        method: 'POST',
        body: newAttendance,
      }),
      invalidatesTags: ['Attendances'],
    }),

    updateAttendance: builder.mutation<Attendance, { id: number; updatedAttendance: Partial<Attendance> }>({
      query: ({ id, updatedAttendance }) => ({
        url: `/attendances/${id}/`,
        method: 'PUT',
        body: updatedAttendance,
      }),
      invalidatesTags: ['Attendances'],
    }),

    deleteAttendance: builder.mutation<void, number>({
      query: (id) => ({
        url: `/attendances/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Attendances'],
    }),
  }),
});

export const {
  useGetAttendancesQuery,
  useGetAttendanceByIdQuery,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendancesApi;