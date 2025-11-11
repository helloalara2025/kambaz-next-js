"use client";

import { ListGroupItem, Button, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, setTodo } from './TodosReducer';

interface RootState {
  todosReducer: {
    todo: {
      id: string;
      title: string;
    };
  };
}

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
      <Button onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">
        Add
      </Button>
      <Button onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click">
        Update
      </Button>
      <FormControl
        value={todo.title}
        onChange={(e) =>
          dispatch(setTodo({ ...todo, title: (e.target as HTMLInputElement).value }))
        }
      />
    </ListGroupItem>
  );
}
