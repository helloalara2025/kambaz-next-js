// redux store configuration for kambaz app
// combines reducers for courses, modules, accounts, and assignments


import { configureStore } from '@reduxjs/toolkit'
import assignmentsReducer from './Courses/reducer'
import enrollmentsReducer from './Enrollments/reducer'

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
    enrollments: enrollmentsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch