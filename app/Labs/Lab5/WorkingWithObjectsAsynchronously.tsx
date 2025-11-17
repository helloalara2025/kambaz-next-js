import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import * as client from "./Client";

// shape of each todo coming from the server
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function WorkingWithArraysAsynchronously() {
  // state is always an array of Todo
  const [todos, setTodos] = useState<Todo[]>([]);

  // GET /lab5/todos
  const fetchTodos = async () => {
    const todosFromServer: Todo[] = await client.fetchTodos();
    setTodos(todosFromServer);
  };

  // DELETE /lab5/todos/:id/delete (or whatever your route is)
  const removeTodo = async (todo: Todo) => {
    await client.removeTodo(todo);
    // refresh the list from the server after deletion
    fetchTodos();
  };

  // POST /lab5/todos/create
  const createNewTodo = async () => {
    const newTodos: Todo[] = await client.createNewTodo();
    setTodos(newTodos);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
  };

  // load todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>
        Todos
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <input
              type="checkbox"
              className="form-check-input me-2"
              defaultChecked={todo.completed}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            >
              🗑️
            </button>
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}