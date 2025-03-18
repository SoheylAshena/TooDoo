import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all", // all, active, completed
  category: "all", // all, today, upcoming, recent
  search: "",
  priority: "all", // all, low, medium, high
  sort: "date-desc", // date-asc, date-desc, priority-asc, priority-desc
  time: "all", // all, today, upcoming, recent
  tags: [],
  partners: [],
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      // For each filter property, only update if it's defined in the payload
      if (action.payload.status !== undefined) {
        state.status = action.payload.status;
      }
      if (action.payload.category !== undefined) {
        state.category = action.payload.category;
      }
      if (action.payload.search !== undefined) {
        state.search = action.payload.search;
      }
      if (action.payload.priority !== undefined) {
        state.priority = action.payload.priority;
      }
      if (action.payload.sort !== undefined) {
        state.sort = action.payload.sort;
      }
      if (action.payload.time !== undefined) {
        state.time = action.payload.time;
      }
      if (action.payload.tags !== undefined) {
        state.tags = action.payload.tags;
      }
      if (action.payload.partners !== undefined) {
        state.partners = action.payload.partners;
      }
    },
    resetFilters: (state) => {
      state.status = initialState.status;
      state.category = initialState.category;
      state.search = initialState.search;
      state.priority = initialState.priority;
      state.sort = initialState.sort;
      state.time = initialState.time;
      state.tags = initialState.tags;
      state.partners = initialState.partners;
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
