/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      MODULES REDUCER                                      ║
 * ║                    Course Modules State                                   ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Manages the state of modules for the currently viewed course.
 * 
 * @author Alara
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  modules: [] as any[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<any[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, action: PayloadAction<any>) => {
      state.modules = [...state.modules, action.payload];
    },
    updateModule: (state, action: PayloadAction<any>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },
  },
});

export const { setModules, addModule, updateModule, deleteModule } = modulesSlice.actions;
export default modulesSlice.reducer;
