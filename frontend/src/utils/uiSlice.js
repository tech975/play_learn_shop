// uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    message: null,
    type: null, // "success" | "error" | "info"
  },
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showMessage, clearMessage } = uiSlice.actions;
export default uiSlice.reducer;
