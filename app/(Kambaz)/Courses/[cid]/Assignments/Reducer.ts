// reducer: manages add, update, delete for assignments
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database"; // from Courses/Assignments to (Kambaz)/Database

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  group?: string;
  displayAs?: "Points" | "Percentage" | "Letter Grade";
  submissionType?: "Online" | "On Paper" | "No Submission";
  due?: string;           // ISO date
  availableFrom?: string; // ISO date
  until?: string;         // ISO date
};

export type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: (db.assignments as Assignment[]) ?? [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      const id = payload._id || Math.random().toString(36).slice(2, 9);
      state.assignments = [...state.assignments, { ...payload, _id: id }];
    },
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? payload : a
      );
    },
    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== payload);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;