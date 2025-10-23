'use client';

export default function BooleanVariables() {
  const numberVariable = 123;
  const floatingPointNumber = 234.345;
  const true1 = true;
  const false1 = false;
  const false2 = true1 && false1;
  const true2 = true1 || false1;
  const true3 = !false2;
  const true4 = numberVariable === 123; // always use === not ==
  const true5 = floatingPointNumber !== 234.345;
  const false3 = numberVariable < 100;

  return (
    <div id="wd-boolean-variables">
      <h4>Boolean Variables</h4>
      true1  = {String(true1)}  <br />
      false1 = {String(false1)} <br />
      false2 = {String(false2)} <br />
      true2  = {String(true2)}  <br />
      true3  = {String(true3)}  <br />
      true4  = {String(true4)}  <br />
      true5  = {String(true5)}  <br />
      false3 = {String(false3)} <br />
      <hr />
    </div>
  );
}