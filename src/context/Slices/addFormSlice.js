import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const addFormSlice = createSlice({
  name: "addForm",
  initialState,
  reducers: {
    openAddForm: (state) => {
      state.isOpen = true;
    },
    closeAddForm: (state) => {
      state.isOpen = false;
    },
    toggleAddForm: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openAddForm, closeAddForm, toggleAddForm } =
  addFormSlice.actions;
export default addFormSlice.reducer;
