"use client";

import { configureStore } from "@reduxjs/toolkit";
import addReducer from "../_disablederrors/ReduxExamples/AddRedux/AddReducer";
import helloReducer from "../_disablederrors/ReduxExamples/HelloRedux/HelloReducer";
import counterReducer from "../_disablederrors/ReduxExamples/CounterRedux/CounterReducer";
import todosReducer from "../_disablederrors/ReduxExamples/todos/TodosReducer";

const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
        todosReducer,
  },
});
export default store;