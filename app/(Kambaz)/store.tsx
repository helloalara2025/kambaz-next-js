import { configureStore } from '@reduxjs/toolkit'
import assignmentsReducer from './Courses/reducer'
import enrollmentsReducer from './Enrollments/reducer'
import accountReducer from './Account/reducer'

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
    enrollments: enrollmentsReducer,
    account: accountReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


//Notes:	•	configures redux store with assignments, enrollments, account reducers
// redux store configuration for kambaz app
// combines reducers for courses, modules, accounts, and assignments

//Goal: configure redux store with assignments, enrollments, account reducers