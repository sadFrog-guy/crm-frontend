import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './errorHandler';
import returnUrlWithParams from '@/functions/returnUrlWithParams';
import { Lesson } from '@/types/lesson';

export const lessonsApi = createApi({
  reducerPath: 'lessonsApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Lessons'],
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: () => ({
        url: '/lessons',
      }),
      providesTags: ['Lessons'],
    }),

    getLessonById: builder.query<Lesson, number>({
      query: (id) => `/lessons/${id}`,
      providesTags: (result, error, id) => [{ type: 'Lessons', id }],
    }),

    createLesson: builder.mutation<Lesson, Partial<Lesson>>({
      query: (newLesson) => ({
        url: '/lessons/',
        method: 'POST',
        body: newLesson,
      }),
      invalidatesTags: ['Lessons'],
    }),

    updateLesson: builder.mutation<Lesson, { id: number; updatedLesson: Partial<Lesson> }>({
      query: ({ id, updatedLesson }) => ({
        url: `/lessons/${id}/`,
        method: 'PUT',
        body: updatedLesson,
      }),
      invalidatesTags: ['Lessons'],
    }),

    deleteLesson: builder.mutation<void, number>({
      query: (id) => ({
        url: `/lessons/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lessons'],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonByIdQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonsApi;