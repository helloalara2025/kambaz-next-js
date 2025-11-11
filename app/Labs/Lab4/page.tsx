"use client";

import store from "./store";
import { Provider } from "react-redux";
import PassingFunctions from "./PassingFunctions";

function ReduxExamples() {
  return <div>ReduxExamples placeholder</div>;
}
export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
      <Provider store={store}>

    <div id="wd-passing-functions">
      <h2>Lab 4</h2>
      ...
      <PassingFunctions theFunction={sayHello} />
           <ReduxExamples/>

    </div>
      </Provider>
  );
}
