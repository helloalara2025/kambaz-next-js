// destructuring
// demonstrates object and array destructuring in js

export default function Destructuring() {
  const person = { name: "John", age: 25 };
  const { name, age } = person;
  const numbers = ["one", "two", "three"];
  const [first, second, third] = numbers;

  return (
    <div id="wd-destructuring">
      <h2>Destructuring</h2>

      <h3>Object Destructuring</h3>
      <code>
        const {'{'} name, age {'}'} = {'{'} name: &quot;John&quot;, age: 25 {'}'}
      </code>
      <br />
      <br />
      name = {name}
      <br />
      age = {age}

      <h3>Array Destructuring</h3>
      <code>
        const [first, second, third] = [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;]
      </code>
      <br />
      <br />
      first = {first}
      <br />
      second = {second}
      <br />
      third = {third}
      <hr />
    </div>
  );
}
