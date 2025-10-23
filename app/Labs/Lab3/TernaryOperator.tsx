/*
  lab3 · ternary operator demo
  simple conditional render example
*/

export default function TernaryOperator() {
  // basic boolean variable
  const loggedIn = true;

  return (
    <div id="wd-ternary-operator">
      <h4>logged in</h4>
      {loggedIn ? <p>welcome</p> : <p>please login</p>}
      <hr />
    </div>
  );
}