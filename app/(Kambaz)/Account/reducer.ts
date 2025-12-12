/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      ACCOUNT REDUCER                                      ║
 * ║                    Authentication State                                   ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This Redux slice manages the authentication state:
 * - Who is currently logged in (currentUser)
 * 
 * REDUX TOOLKIT'S createSlice:
 * Instead of writing action types, action creators, and reducers separately,
 * createSlice bundles them all together. It uses Immer under the hood,
 * allowing us to write "mutating" code that actually creates immutable updates.
 * 
 * STATE SHAPE:
 * {
 *   currentUser: null | {
 *     _id: string,
 *     username: string,
 *     firstName: string,
 *     lastName: string,
 *     role: string,
 *     ...
 *   }
 * }
 * 
 * @author Alara
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Initial state - no one is logged in by default
 */
const initialState = {
  currentUser: null as any,
};

/**
 * Account Slice
 * 
 * The slice automatically generates action creators for each reducer function.
 * setCurrentUser → dispatch(setCurrentUser(user))
 */
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    /**
     * Set the current logged-in user
     * 
     * Called after:
     * - Successful signin
     * - Successful signup
     * - Session restoration (profile check)
     * 
     * @param state - Current state (mutate it directly with Immer)
     * @param action - Contains the user object in action.payload
     */
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
});

// Export the action creator
export const { setCurrentUser } = accountSlice.actions;

// Export the reducer (used in store configuration)
export default accountSlice.reducer;
