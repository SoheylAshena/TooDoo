import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: "tasks",
};

const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    currentView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

export const { currentView } = currentSlice.actions;

export default currentSlice.reducer;
