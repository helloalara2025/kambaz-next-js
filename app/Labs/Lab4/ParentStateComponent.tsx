import { useState } from "react";

type ChildProps = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

function ChildStateComponent({ counter, setCounter }: ChildProps) {
  return (
    <div>
      <p>Child sees counter: {counter}</p>
      <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
      <button onClick={() => setCounter((c) => c - 1)}>Decrement</button>
    </div>
  );
}
export default function ParentStateComponent() {
  const [counter, setCounter] = useState(123);
  return (
    <div>
      <h2>Counter {counter}</h2>
      <ChildStateComponent
        counter={counter}
        setCounter={setCounter} />
      <hr/>
    </div>
);}
