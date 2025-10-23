/*
  lab 3 main page
  shows basic javascript and react examples
  imports and renders all lab3 components
*/

'use client';

import VariablesAndConstants from "./VariablesAndConstants";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import Classes from "./Classes";
import ConditionalOutputElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FunctionDestructing from "./FunctionDestructing";
import IfElse from "./IfEelse";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import SimpleArrays from "./SimpleArrays";
import Spreaders from "./Spreader";
import House from "./House";

export default function Lab3() {
  return (
    <div id="wd-lab3" className="container-fluid py-4">
      <h2 className="mb-4 fw-bold text-primary">Lab 3 – JavaScript & React Fundamentals</h2>

      <section className="mb-5">
        <h4 className="text-danger">Variables & Constants</h4>
        <VariablesAndConstants />
      </section>

      <section className="mb-5">
        <h4>Add & Math Functions</h4>
        <Add a={3} b={4} />
        <h5>Square of 4</h5>
        <Square>4</Square>
      </section>

      <section className="mb-5">
        <h4>Highlight Example</h4>
        <Highlight>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ratione eaque illo minus cum saepe totam vel nihil repellat nemo.
        </Highlight>
      </section>

      <section className="mb-5">
        <h4>Array & Boolean Logic</h4>
        <ArrayIndexAndLength />
        <ArrowFunctions />
        <BooleanVariables />
      </section>

      <section className="mb-5">
        <h4>Conditional Output</h4>
        <ConditionalOutputElse />
        <ConditionalOutputInline />
      </section>

      <section className="mb-5">
        <h4>Classes & Destructuring</h4>
        <Classes />
        <Destructing />
        <DestructingImports />
        <FunctionDestructing />
      </section>

      <section className="mb-5">
        <h4>Functions & Filters</h4>
        <FilterFunction />
        <FindFunction />
        <FindIndex />
      </section>

      <section className="mb-5">
        <h4>Conditional Logic & Returns</h4>
        <IfElse />
        <ImpliedReturn />
      </section>

      <section className="mb-5">
        <h4>JSON & Arrays</h4>
        <JsonStringify />
        <SimpleArrays />
      </section>

      <section className="mb-5">
        <h4>Spread & Components</h4>
        <Spreaders />
        <House />
      </section>
    </div>
  );
}
