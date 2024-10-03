import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './errorHandler';
import { WorkSchedule } from '@/types/workSchedule';

export const workScheduleApi = createApi({
  reducerPath: 'workScheduleApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getWorkSchedule: builder.query<WorkSchedule[], number>({
      query: (teacherId) => ({
        url: `/work-schedules?teacher=${teacherId}`,
      }),
    }),
  }),
});

export const { useGetWorkScheduleQuery } = workScheduleApi;