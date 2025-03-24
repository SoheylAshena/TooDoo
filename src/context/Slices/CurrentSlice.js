import { createSlice } from "@reduxjs/toolkit";

const initialState = "tasks";

const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    currentView: (state, action) => {
      state = action.payload;
    },
  },
});

export const { currentView } = currentSlice.actions;

export default currentSlice.reducer;
