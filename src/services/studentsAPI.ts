import { createApi } from '@reduxjs/toolkit/query/react';
import { Student } from '@/types/students';
import { baseQueryWithErrorHandling } from './errorHandler';
import returnUrlWithParams from '@/functions/returnUrlWithParams';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Students'],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], { id: number; type: 'branch' | 'group' }>({
      query: ({ id, type }) => ({
        url: returnUrlWithParams('students', id, type),
      }),
      providesTags: ['Students'],
    }),

    getStudentById: builder.query<Student, number>({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Students', id }],
    }),

    createStudent: builder.mutation<Student, Partial<Student>>({
      query: (newStudent) => ({
        url: '/students/',
        method: 'POST',
        body: newStudent,
      }),
      invalidatesTags: ['Students'],
    }),

    updateStudent: builder.mutation<Student, { id: number; updatedStudent: Partial<Student> }>({
      query: ({ id, updatedStudent }) => ({
        url: `/students/${id}/`,
        method: 'PUT',
        body: updatedStudent,
      }),
      invalidatesTags: ['Students'],
    }),

    deleteStudent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/students/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;