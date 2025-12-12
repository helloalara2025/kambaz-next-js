/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                        REDUX STORE                                        ║
 * ║                    Global State Management                                ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * WHAT IS REDUX?
 * Redux is a predictable state container. It helps manage state that needs
 * to be shared across many components (like "who is logged in").
 * 
 * KEY CONCEPTS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STORE:    The single source of truth (holds all app state)            │
 * │  ACTION:   An event that describes something that happened             │
 * │  REDUCER:  A function that updates state based on an action            │
 * │  SLICE:    A bundle of reducer + actions for one feature               │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * DATA FLOW:
 * 1. Component dispatches an action: dispatch(setCurrentUser(user))
 * 2. Reducer receives action and updates state
 * 3. Components subscribed to that state re-render
 * 
 * WHY USE REDUX HERE?
 * - currentUser needs to be accessible everywhere
 * - Courses/modules need to be shared across components
 * - Avoids "prop drilling" (passing data through many components)
 * 
 * @author Alara
 */

import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../Account/reducer";
import modulesReducer from "../Courses/[cid]/Modules/reducer";
import assignmentsReducer from "../Courses/[cid]/Assignments/reducer";

/**
 * Configure the Redux store
 * 
 * Each reducer manages a "slice" of the global state:
 * - accountReducer: currentUser, authentication state
 * - modulesReducer: modules for the current course
 * - assignmentsReducer: assignments for the current course
 */
const store = configureStore({
  reducer: {
    accountReducer,
    modulesReducer,
    assignmentsReducer,
  },
});

/**
 * Type exports for TypeScript
 * 
 * RootState: The shape of the entire Redux state
 * AppDispatch: The type of the dispatch function
 * 
 * Usage in components:
 * const state = useSelector((state: RootState) => state.accountReducer);
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
