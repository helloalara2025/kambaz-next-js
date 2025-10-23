
'use client';
import type { ReactElement } from 'react';

export default function AddingAndRemovingToFromArrays() {
  // numeric, string, and todo arrays
  const numberArray1: number[] = [1, 2, 3, 4, 5];
  const stringArray1: string[] = ['string1', 'string2'];
  const todoArray: ReactElement[] = [
    <li key="1">Buy milk</li>,
    <li key="2">Feed the pets</li>
  ];

  // add new items
  numberArray1.push(6);
  stringArray1.push('string3');
  todoArray.push(<li key="3">Walk the dogs</li>);

  // remove items
  numberArray1.splice(2, 1); // remove 1 item starting at index 2
  stringArray1.splice(1, 1);

  return (
    <div id="wd-adding-removing-from-arrays" className="p-3">
      <h4 className="mb-3">Add / Remove to/from Arrays</h4>
      <div>
        <strong>numberArray1:</strong> {numberArray1.join(', ')}
      </div>
      <div>
        <strong>stringArray1:</strong> {stringArray1.join(', ')}
      </div>
      <div className="mt-2">
        <strong>Todo list:</strong>
        <ol>{todoArray}</ol>
      </div>
      <hr />
    </div>
  );
}
