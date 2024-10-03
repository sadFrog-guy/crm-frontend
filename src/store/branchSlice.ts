import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BranchState {
  branchId: number | null; // null для случая, когда филиал не выбран
}

const initialState: BranchState = {
  branchId: 1, // Начальное состояние, без выбранного филиала
};

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranchId: (state, action: PayloadAction<number>) => {
      state.branchId = action.payload;
    },
  },
});

export const { setBranchId } = branchSlice.actions;
export default branchSlice.reducer;