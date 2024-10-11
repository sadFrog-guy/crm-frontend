import { configureStore } from "@reduxjs/toolkit";

import { lessonScheduleApi } from "./../services/lessonsScheduleAPI";
import { workScheduleApi } from "./../services/workScheduleAPI";
import { financeApi } from "./../services/financesAPI";
import branchReducer from "./branchSlice";
import selectedRowReducer from "./selectedRowSlice";

import { studentApi } from "@/services/studentsAPI";
import { groupsApi } from "@/services/groupsAPI";
import { branchApi } from "@/services/branchesAPI";
import { teacherApi } from "@/services/teachersAPI";
import { lessonsApi } from "@/services/lessonAPI";
import { attendancesApi } from "@/services/attendanceAPI";

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [lessonScheduleApi.reducerPath]: lessonScheduleApi.reducer,
    [workScheduleApi.reducerPath]: workScheduleApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
    [lessonsApi.reducerPath]: lessonsApi.reducer,
    [attendancesApi.reducerPath]: attendancesApi.reducer,
    branch: branchReducer,
    selectedRow: selectedRowReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(studentApi.middleware)
      .concat(groupsApi.middleware)
      .concat(branchApi.middleware)
      .concat(lessonScheduleApi.middleware)
      .concat(workScheduleApi.middleware)
      .concat(teacherApi.middleware)
      .concat(financeApi.middleware)
      .concat(lessonsApi.middleware)
      .concat(attendancesApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
