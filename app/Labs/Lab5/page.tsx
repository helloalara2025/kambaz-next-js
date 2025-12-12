/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                          LAB 5 PAGE                                       ║
 * ║                    HTTP Server Exercises                                  ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Lab exercises for working with HTTP servers.
 * Demonstrates making API calls to the Node.js backend.
 * 
 * @author Alara
 * @route /Labs/Lab5
 */

"use client";

import { useEffect, useState } from "react";
import { Card, Form, Button, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function Lab5() {
  // Calculator state
  const [calcA, setCalcA] = useState(1);
  const [calcB, setCalcB] = useState(2);
  const [operation, setOperation] = useState("add");
  const [calcResult, setCalcResult] = useState<any>(null);

  // Todos state
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  /**
   * Fetch todos on mount
   */
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${HTTP_SERVER}/lab5/todos`);
      setTodos(response.data);
    } catch (err) {
      setError("Error fetching todos");
    }
  };

  /**
   * Calculator operations
   */
  const calculate = async () => {
    try {
      const response = await axios.get(
        `${HTTP_SERVER}/lab5/calculator?a=${calcA}&b=${calcB}&operation=${operation}`
      );
      setCalcResult(response.data);
    } catch (err) {
      setError("Calculation error");
    }
  };

  /**
   * Create new todo
   */
  const createTodo = async () => {
    try {
      const response = await axios.post(`${HTTP_SERVER}/lab5/todos`, newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ title: "", description: "" });
    } catch (err) {
      setError("Error creating todo");
    }
  };

  /**
   * Delete todo
   */
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${HTTP_SERVER}/lab5/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting todo");
    }
  };

  /**
   * Toggle todo completion
   */
  const toggleTodo = async (todo: any) => {
    try {
      await axios.put(`${HTTP_SERVER}/lab5/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(
        todos.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating todo");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Lab 5 - HTTP Server Exercises</h1>
      <h2>Created by Alara</h2>
      <hr />

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {/* Calculator Section */}
      <Card className="mb-4">
        <Card.Header>
          <h3>Calculator</h3>
        </Card.Header>
        <Card.Body>
          <div className="row g-3 align-items-end">
            <div className="col-auto">
              <Form.Label>A</Form.Label>
              <Form.Control
                type="number"
                value={calcA}
                onChange={(e) => setCalcA(parseInt(e.target.value))}
                style={{ width: "100px" }}
              />
            </div>
            <div className="col-auto">
              <Form.Label>Operation</Form.Label>
              <Form.Select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                style={{ width: "120px" }}
              >
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
                <option value="multiply">Multiply</option>
                <option value="divide">Divide</option>
              </Form.Select>
            </div>
            <div className="col-auto">
              <Form.Label>B</Form.Label>
              <Form.Control
                type="number"
                value={calcB}
                onChange={(e) => setCalcB(parseInt(e.target.value))}
                style={{ width: "100px" }}
              />
            </div>
            <div className="col-auto">
              <Button variant="primary" onClick={calculate}>
                Calculate
              </Button>
            </div>
          </div>

          {calcResult && (
            <div className="mt-3">
              <strong>Result:</strong>{" "}
              {calcResult.a} {operation} {calcResult.b} = {calcResult.result}
            </div>
          )}

          <hr />

          <p className="text-muted">
            Direct links to test server endpoints:
          </p>
          <ul>
            <li>
              <a href={`${HTTP_SERVER}/lab5/add/5/3`} target="_blank">
                /lab5/add/5/3
              </a>
            </li>
            <li>
              <a href={`${HTTP_SERVER}/lab5/subtract/10/4`} target="_blank">
                /lab5/subtract/10/4
              </a>
            </li>
            <li>
              <a href={`${HTTP_SERVER}/lab5/multiply/3/7`} target="_blank">
                /lab5/multiply/3/7
              </a>
            </li>
            <li>
              <a href={`${HTTP_SERVER}/lab5/divide/20/5`} target="_blank">
                /lab5/divide/20/5
              </a>
            </li>
          </ul>
        </Card.Body>
      </Card>

      {/* Todos Section */}
      <Card className="mb-4">
        <Card.Header>
          <h3>Working with Arrays (Todos)</h3>
        </Card.Header>
        <Card.Body>
          {/* Add Todo Form */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <Form.Control
                type="text"
                placeholder="Title"
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
                }
              />
            </div>
            <div className="col-md-5">
              <Form.Control
                type="text"
                placeholder="Description"
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, description: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <Button
                variant="success"
                onClick={createTodo}
                disabled={!newTodo.title.trim()}
              >
                Add Todo
              </Button>
            </div>
          </div>

          {/* Todo List */}
          <ListGroup>
            {todos.map((todo) => (
              <ListGroup.Item
                key={todo.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo)}
                    className="me-3"
                  />
                  <div>
                    <strong
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.title}
                    </strong>
                    {todo.description && (
                      <div className="text-muted small">{todo.description}</div>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {todos.length === 0 && (
            <p className="text-muted text-center py-3">No todos yet.</p>
          )}
        </Card.Body>
      </Card>

      {/* Server Info */}
      <Card>
        <Card.Header>
          <h3>Server Information</h3>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Server URL:</strong> {HTTP_SERVER}
          </p>
          <p>
            <a href={`${HTTP_SERVER}/lab5/welcome`} target="_blank">
              Test Welcome Endpoint
            </a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
