// reducer.ts (or Reducer.ts - be consistent with your imports)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// User type definition
export type User = {
  _id?: string;
  username?: string;
  password?: string;
  first?: string;
  last?: string;
  dob?: string;
  email?: string;
  role?: string;
};

// State interface
interface AccountState {
  currentUser: User | null;
}

// Initial state
const initialState: AccountState = {
  currentUser: null,
};

// Create the slice
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    updateCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

// Export actions
export const { setCurrentUser, updateCurrentUser, clearCurrentUser } = accountSlice.actions;

// Export reducer
export default accountSlice.reducer;