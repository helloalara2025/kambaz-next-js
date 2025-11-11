import React from 'react';

type Todo = { id: string; title: string };

export default function TodoItem({ todo, deleteTodo, setTodo }: {
  todo: Todo;
  deleteTodo: (id: string) => void;
  setTodo: (todo: Todo) => void;
}) {
  return (
    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
      <span>{todo.title}</span>
      <div>
        <button
          onClick={() => deleteTodo(todo.id)}
          id="wd-delete-todo-click"
          className="btn btn-danger btn-sm me-2"
        >
          Delete
        </button>
        <button
          onClick={() => setTodo(todo)}
          id="wd-set-todo-click"
          className="btn btn-primary btn-sm"
        >
          Edit
        </button>
      </div>
    </li>
  );
}
      