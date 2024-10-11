import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithErrorHandling } from "./errorHandler";

import { LessonSchedule } from "@/types/lessonsSchedule";

export const lessonScheduleApi = createApi({
  reducerPath: "lessonScheduleApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["LessonSchedule"],
  endpoints: (builder) => ({
    getLessonSchedules: builder.query<LessonSchedule[], number>({
      query: (groupId) => ({
        url: `/lesson-schedules?group=${groupId}`,
      }),
      providesTags: ["LessonSchedule"],
    }),
    getLessonScheduleById: builder.query<LessonSchedule, number>({
      query: (id) => `/lesson-schedules/${id}`,
      providesTags: ["LessonSchedule"],
    }),
    createLessonSchedule: builder.mutation<
      LessonSchedule,
      Partial<LessonSchedule>
    >({
      query: (newSchedule) => ({
        url: "/lesson-schedules/",
        method: "POST",
        body: newSchedule,
      }),
      invalidatesTags: ["LessonSchedule"],
    }),
    updateLessonSchedule: builder.mutation<
      LessonSchedule,
      { id: number; updatedSchedule: Partial<LessonSchedule> }
    >({
      query: ({ id, updatedSchedule }) => ({
        url: `/lesson-schedules/${id}/`,
        method: "PUT",
        body: updatedSchedule,
      }),
      invalidatesTags: ["LessonSchedule"],
    }),
    deleteLessonSchedule: builder.mutation<void, number>({
      query: (id) => ({
        url: `/lesson-schedules/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LessonSchedule"],
    }),
  }),
});

export const {
  useGetLessonSchedulesQuery,
  useGetLessonScheduleByIdQuery,
  useCreateLessonScheduleMutation,
  useUpdateLessonScheduleMutation,
  useDeleteLessonScheduleMutation,
} = lessonScheduleApi;
