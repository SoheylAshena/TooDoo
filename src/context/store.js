import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slices/tasksSlice";
import filtersReducer from "./Slices/filtersSlice";

export const store = configureStore({
  reducer: { tasks: tasksReducer, filters: filtersReducer },
});
