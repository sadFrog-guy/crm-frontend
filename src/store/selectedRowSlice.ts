import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedRowState {
  rowId: number | null;
  isDisabled: boolean;
}

const initialState: SelectedRowState = {
  rowId: 1,
  isDisabled: true,
};

const selectedRowSlice = createSlice({
  name: "selectedRow",
  initialState,
  reducers: {
    setSelectedRow: (state, action: PayloadAction<number | null>) => {
      state.rowId = action.payload;
    },
    setDisabled: (state, action: PayloadAction<boolean>) => {
      state.isDisabled = action.payload;
    },
  },
});

export const { setSelectedRow, setDisabled } = selectedRowSlice.actions;
export default selectedRowSlice.reducer;