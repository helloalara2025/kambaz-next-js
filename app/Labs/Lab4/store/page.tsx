import { configureStore } from "@reduxjs/toolkit";
import addReducer from "../ReduxExamples/AddRedux/AddReducer";
import helloReducer from "../ReduxExamples/HelloRedux/HelloReducer";
import counterReducer from "../ReduxExamples/CounterRedux/CounterReducer";
import todosReducer from "../ReduxExamples/todos/TodosReducer";

const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
        todosReducer,
  },
});
export default store;