import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// Throttle localStorage writes to prevent excessive operations
const throttle = (func, delay) => {
  let lastCall = 0;
  let timeoutId = null;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall < delay) {
      // If not enough time has passed, clear the existing timeout
      // and set a new one
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = now;
        func.apply(this, args);
      }, delay);
    } else {
      // If enough time has passed, execute immediately
      lastCall = now;
      func.apply(this, args);
    }
  };
};

// Load tasks from localStorage if available
const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : getDefaultTasks();

    // Ensure partners is always an array
    if (parsedTasks && parsedTasks.length > 0) {
      parsedTasks.forEach((task) => {
        if (task.partners && !Array.isArray(task.partners)) {
          task.partners = task.partners.split
            ? task.partners.split(",")
            : [task.partners];
        }

        // Ensure tags is always an array
        if (!task.tags) task.tags = [];

        // Ensure dates are properly stored as ISO strings
        if (task.date && !(typeof task.date === "string")) {
          task.date = new Date(task.date).toISOString();
        }

        // Ensure createdAt exists and is properly formatted
        if (!task.createdAt) {
          task.createdAt = new Date().toISOString();
        } else if (!(typeof task.createdAt === "string")) {
          task.createdAt = new Date(task.createdAt).toISOString();
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

// Throttled save to localStorage to prevent excessive writes
const saveTasks = throttle((tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
}, 1000); // Throttle to once per second maximum

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
      } else {
        console.error(`Task with ID ${action.payload} not found`);
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
    // Batch updates for better performance
    batchUpdateTasks: (state, action) => {
      const { updates } = action.payload;
      let hasChanges = false;

      updates.forEach((update) => {
        const { id, type, data } = update;

        if (type === "toggle") {
          const task = state.find((task) => task.id === id);
          if (task) {
            task.completed = !task.completed;
            hasChanges = true;
          }
        } else if (type === "update") {
          const index = state.findIndex((task) => task.id === id);
          if (index !== -1) {
            const existingTask = state[index];
            state[index] = { ...existingTask, ...data };
            hasChanges = true;
          }
        } else if (type === "delete") {
          const newStateAfterDelete = state.filter((task) => task.id !== id);
          if (newStateAfterDelete.length !== state.length) {
            state = newStateAfterDelete;
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        saveTasks(state);
      }
    },
  },
});

export const {
  addTasks,
  deleteTasks,
  toggleTask,
  updateTask,
  batchUpdateTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
