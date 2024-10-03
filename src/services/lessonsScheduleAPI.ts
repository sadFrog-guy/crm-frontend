import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './errorHandler';
import { LessonSchedule } from '@/types/lessonsSchedule';

export const lessonsScheduleApi = createApi({
  reducerPath: 'lessonsScheduleApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getLessonsSchedule: builder.query<LessonSchedule[], number>({
      query: (groupId) => ({
        url: `/lesson-schedules?group=${groupId}`,
      }),
    }),
  }),
});

export const { useGetLessonsScheduleQuery } = lessonsScheduleApi;