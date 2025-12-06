import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/reducer";
import enrollmentsReducer from "./Dashboard/enrollmentsReducer";

const store = configureStore({
  reducer: {
    account: accountReducer,
    assignments: assignmentsReducer,
    enrollments: enrollmentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;