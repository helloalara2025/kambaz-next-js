import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div id="wd-counter-use-state">
      <h2>Counter: {count}</h2>
      <button
        onClick={() => { setCount((prev) => { const next = prev + 1; console.log(next); return next; }); }}
        id="wd-counter-up-click">Up</button>
      <button
        onClick={() => { setCount((prev) => { const next = prev - 1; console.log(next); return next; }); }}
        id="wd-counter-down-click">Down</button>
<hr/></div>);}