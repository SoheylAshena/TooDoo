import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const editFormSlice = createSlice({
  name: "editForm",
  initialState,
  reducers: {
    openEditForm: (state) => {
      state.isOpen = true;
    },
    closeEditForm: (state) => {
      state.isOpen = false;
    },
    toggleEditForm: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openEditForm, closeEditForm, toggleEditForm } =
  editFormSlice.actions;
export default editFormSlice.reducer;
