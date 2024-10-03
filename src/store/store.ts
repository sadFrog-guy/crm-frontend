import { lessonsScheduleApi } from './../services/lessonsScheduleAPI';
import { workScheduleApi } from './../services/workScheduleAPI';
import { financeApi } from './../services/financesAPI';
import { studentApi } from '@/services/studentsAPI';
import { groupsApi } from '@/services/groupsAPI';
import { branchApi } from '@/services/branchesAPI';
import { teacherApi } from '@/services/teachersAPI';
import { configureStore } from '@reduxjs/toolkit';
import branchReducer from './branchSlice';
import selectedRowReducer from './selectedRowSlice';

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [lessonsScheduleApi.reducerPath]: lessonsScheduleApi.reducer,
    [workScheduleApi.reducerPath]: workScheduleApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
    branch: branchReducer,
    selectedRow: selectedRowReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
              .concat(studentApi.middleware)
              .concat(groupsApi.middleware)
              .concat(branchApi.middleware)
              .concat(lessonsScheduleApi.middleware)
              .concat(workScheduleApi.middleware)
              .concat(teacherApi.middleware)
              .concat(financeApi.middleware)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;