import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slices/tasksSlice";

export const store = configureStore({ reducer: { tasks: tasksReducer } });
