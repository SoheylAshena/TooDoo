import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      id: nanoid(),
      text: "This is my task",
      category: "Personal",
      tags: ["New", "Developer", "Redux"],
      partners: "Soheyl",
      completed: false,
      date: new Date(),
    },
    {
      id: nanoid(),
      text: "This is my second task",
      category: "Personal",
      tags: ["Meaw", "Hello", "Dogy"],
      partners: "Ali",
      completed: false,
      date: new Date(),
    },
    {
      id: nanoid(),
      text: "This is my third task",
      category: "Team",
      tags: ["Developer", "Lolo", "Redux", "Dog"],
      partners: "Narges",
      completed: true,
      date: new Date(),
    },
  ],
  reducers: {
    addTasks: (state, action) => {
      const newTask = {
        id: nanoid(),
        text: action.payload.text,
        category: action.payload.category || "Personal",
        tags: action.payload.tags || [],
        partners: action.payload.partners || "",
        completed: false,
        date: new Date(),
      };
      state.push(newTask);
    },
    deleteTasks: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTasks, deleteTasks, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
