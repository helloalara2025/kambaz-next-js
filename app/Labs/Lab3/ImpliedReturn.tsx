/*
  lab3 · implied return demo
  shows arrow function shorthand returning values
*/

export default function ImpliedReturn() {
  // simple multiply arrow function
  const multiply = (a: number, b: number) => a * b;

  // result variable
  const fourTimesFive = multiply(4, 5);
  console.log(fourTimesFive);

  return (
    <div id="wd-implied-return">
      <h4>implied return</h4>
      fourTimesFive = {fourTimesFive} <br />
      multiply(4, 5) = {multiply(4, 5)} <hr />
    </div>
  );
}
