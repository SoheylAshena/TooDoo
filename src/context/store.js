import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slices/tasksSlice";
import filtersReducer from "./Slices/filtersSlice";
import currentReducer from "./Slices/CurrentSlice";
import addFormReducer from "./Slices/addFormSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    current: currentReducer,
    addForm: addFormReducer,
  },
});
