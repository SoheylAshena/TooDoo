import { createSlice } from "@reduxjs/toolkit";
import { getFilterConfig } from "../../Utilities/filterUtils";

const initialState = "all";

const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      return action.payload;
    },
    syncCurrentWithFilters: (state, action) => {
      const currentFilters = action.payload;

      const configCases = [
        "all",
        "completed",
        "high",
        "today",
        "upcoming",
        "recent",
        "active",
        "calendar",
      ];

      for (const configCase of configCases) {
        const config = getFilterConfig(configCase);
        if (!config) continue;

        const isMatch =
          currentFilters.category === config.category &&
          currentFilters.status === config.status &&
          currentFilters.priority === config.priority &&
          currentFilters.time === config.time;

        if (isMatch) {
          return configCase;
        }
      }

      return "";
    },
  },
});

export const checkAndSyncCurrent = () => (dispatch, getState) => {
  const currentFilters = getState().filters;
  dispatch(syncCurrentWithFilters(currentFilters));
};

export const { setCurrent, syncCurrentWithFilters } = currentSlice.actions;

export default currentSlice.reducer;
