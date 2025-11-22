import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type AccountState = {
  currentUser: User | null;
};

const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    updateCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.currentUser) return;
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  setCurrentUser,
  updateCurrentUser,
  clearCurrentUser,
} = accountSlice.actions;

export default accountSlice.reducer;

//Notes:	•	manages current user in redux
//	•	exposes setCurrentUser, updateCurrentUser, clearCurrentUser actions   
//Goal: hold current user in redux and expose setCurrentUser, updateCurrentUser, clearCurrentUser       