// reducer: manages the current signed in user across app
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state
interface User {
  id: string;
  email?: string;
  name?: string;
  // add other user fields as needed
}

interface AccountState {
  currentUser: User | null;
}

const initialState: AccountState = {
  currentUser: null,
};

// create slice
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

// export
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;