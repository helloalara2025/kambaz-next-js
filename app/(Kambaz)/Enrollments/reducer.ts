import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EnrollmentsState = {
  courseIds: string[];
};

const initialState: EnrollmentsState = {
  courseIds: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // replace all enrollments
    setEnrollments: (state, action: PayloadAction<string[]>) => {
      state.courseIds = action.payload;
    },
    // add one course id
    enrollInCourse: (state, action: PayloadAction<string>) => {
      if (!state.courseIds.includes(action.payload)) {
        state.courseIds.push(action.payload);
      }
    },
    // remove one course id
    unenrollFromCourse: (state, action: PayloadAction<string>) => {
      state.courseIds = state.courseIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  setEnrollments,
  enrollInCourse,
  unenrollFromCourse,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;

//Notes:	•	manages list of enrolled course IDs in redux
//	•	exposes setEnrollments, enrollInCourse, unenrollFromCourse actions   
//Goal: hold all enrolled course IDs in redux and expose setEnrollments, enrollInCourse, unenrollFromCourse