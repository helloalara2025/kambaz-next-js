/*
  lab3 · if else demo
  shows conditional rendering with && and ternary operator
*/

export default function IfElse() {
  // basic boolean values
  const true1 = true;
  const false1 = false;

  return (
    <div id="wd-if-else">
      <h4>if else</h4>
      {true1 && <p>true1</p>}
      {!false1 ? <p>!false1</p> : <p>false1</p>}
      <hr />
    </div>
  );
}