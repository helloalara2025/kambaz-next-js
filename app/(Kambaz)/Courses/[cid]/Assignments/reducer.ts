/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      ASSIGNMENTS REDUCER                                  ║
 * ║                    Course Assignments State                               ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * @author Alara
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<any[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<any>) => {
      state.assignments = [...state.assignments, action.payload];
    },
    updateAssignment: (state, action: PayloadAction<any>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== action.payload);
    },
  },
});

export const { setAssignments, addAssignment, updateAssignment, deleteAssignment } = 
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
