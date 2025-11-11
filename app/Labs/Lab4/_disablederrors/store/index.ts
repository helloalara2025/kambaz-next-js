import { configureStore } from "@reduxjs/toolkit";
import type { AnyAction } from "redux";
const initialState = { greeting: "hello" };

function helloReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    default:
      return state;
  }
}


const store = configureStore({
  reducer: { helloReducer }
});
export default store;

