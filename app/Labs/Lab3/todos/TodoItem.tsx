'use client';

import { ListGroupItem } from 'react-bootstrap';

type Todo = { done: boolean; title: string; status: string };

export default function TodoItem({
  todo = { done: true, title: 'Buy milk', status: 'COMPLETED' },
}: { todo?: Todo }) {
  return (
    <ListGroupItem>
      <input type="checkbox" className="me-2" defaultChecked={todo.done} />
      {todo.title} ({todo.status})
    </ListGroupItem>
  );
}