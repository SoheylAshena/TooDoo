import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// Load tasks from localStorage if available
const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : getDefaultTasks();

    // Debug partners data
    if (parsedTasks && parsedTasks.length > 0) {
      parsedTasks.forEach((task) => {
        // Ensure partners is always an array
        if (task.partners && !Array.isArray(task.partners)) {
          console.log("Converting partners to array for task:", task.id);
          task.partners = task.partners.split
            ? task.partners.split(",")
            : [task.partners];
        }
      });
    }

    return parsedTasks;
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return getDefaultTasks();
  }
};

// Default tasks for first-time users
const getDefaultTasks = () => [
  {
    id: nanoid(),
    text: "Test Task #1",
    category: "Personal",
    tags: ["State", "React", "Redux"],
    partners: ["Soheyl"],
    completed: false,
    date: new Date(
      new Date().setMonth(new Date().getMonth() + 1),
    ).toISOString(),
    priority: "High",
    createdAt: new Date(
      new Date().setMonth(new Date().getMonth() - 3),
    ).toISOString(),
  },
  {
    id: nanoid(),
    text: "Test Task #2",
    category: "Team",
    tags: ["Greet", "Intract", "Help"],
    partners: ["Ali"],
    completed: false,
    date: new Date(
      new Date().setMonth(new Date().getMonth() + 2),
    ).toISOString(),
    priority: "Medium",
    createdAt: new Date(
      new Date().setMonth(new Date().getMonth() - 2),
    ).toISOString(),
  },
  {
    id: nanoid(),
    text: "Test Task #3",
    category: "Company",
    tags: ["Meeting", "Project", "Lunch"],
    partners: ["Narges"],
    completed: true,
    date: new Date(
      new Date().setMonth(new Date().getMonth() + 3),
    ).toISOString(),
    priority: "Low",
    createdAt: new Date(
      new Date().setMonth(new Date().getMonth() - 1),
    ).toISOString(),
  },
];

// Save tasks to localStorage
const saveTasks = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: loadTasks(),
  reducers: {
    addTasks: (state, action) => {
      const newTask = {
        id: nanoid(),
        text: action.payload.text,
        category: action.payload.category || "Personal",
        tags: action.payload.tags || [],
        partners: action.payload.partners || [],
        completed: false,
        date: new Date(action.payload.date).toISOString(),
        priority: action.payload.priority || "Medium",
        createdAt: new Date().toISOString(),
      };
      state.push(newTask);
      saveTasks(state);
    },
    deleteTasks: (state, action) => {
      const newState = state.filter((task) => task.id !== action.payload);
      saveTasks(newState);
      return newState;
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state);
      }
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.findIndex((task) => task.id === id);
      if (index !== -1) {
        const existingTask = state[index];
        state[index] = {
          ...existingTask,
          text: updatedTask.text || existingTask.text,
          category: updatedTask.category || existingTask.category,
          tags: updatedTask.tags || existingTask.tags,
          partners: updatedTask.partners || existingTask.partners,
          completed: updatedTask.completed ?? existingTask.completed,
          date: updatedTask.date
            ? new Date(updatedTask.date).toISOString()
            : existingTask.date,
          priority: updatedTask.priority || existingTask.priority,
        };
        saveTasks(state);
      }
    },
  },
});

export const { addTasks, deleteTasks, toggleTask, updateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
