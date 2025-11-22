import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Course = {
  _id?: string;
  name?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
};

type CoursesState = {
  courses: Course[];
};

const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },

    // push new course
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },

    // remove by id
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },

    // patch one course by id
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    },
  },
});

export const { setCourses, addCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;

//Notes:	•	manages list of courses in redux
//	•	exposes setCourses, addCourse, deleteCourse, updateCourse actions   
//Goal: hold all courses in redux and expose setCourses, addCourse, updateCourse, deleteCourse