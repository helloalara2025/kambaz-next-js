import { ListGroup } from "react-bootstrap";

type Todo = {
  done: boolean;
  title: string;
  status: string;
};

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <ListGroup.Item>
      <input
        type="checkbox"
        className="me-2"
        defaultChecked={todo.done}
      />
      {todo.title}
      <span className="ms-2 text-muted small">({todo.status})</span>
    </ListGroup.Item>
  );
}
