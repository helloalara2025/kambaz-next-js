import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";

import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import db from "./Kambaz/Database/index.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
const app = express();

// simple in memory todos
let todos = [
  {
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  },
  {
    id: "2",
    title: "React Assignment",
    description: "Build the Kambaz LMS client",
    completed: true,
  },
  {
    id: "3",
    title: "MongoDB Assignment",
    description: "Work with MongoDB database",
    completed: false,
  },
];

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

// kambaz apis
UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app);

// lab5 welcome
app.get("/lab5/welcome", (req, res) => {
  res.send("Welcome to Lab 5!");
});

// path params: add / subtract / multiply / divide
app.get("/lab5/add/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send(String(a + b));
});

app.get("/lab5/subtract/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send(String(a - b));
});

app.get("/lab5/multiply/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send(String(a * b));
});

app.get("/lab5/divide/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  if (b === 0) {
    return res.status(400).send("Cannot divide by zero");
  }
  res.send(String(a / b));
});

// query params calculator: ?operation=add&a=34&b=23
app.get("/lab5/calculator", (req, res) => {
  const { operation, a, b } = req.query;
  const x = Number(a);
  const y = Number(b);

  let result;

  switch (operation) {
    case "add":
      result = x + y;
      break;
    case "subtract":
      result = x - y;
      break;
    case "multiply":
      result = x * y;
      break;
    case "divide":
      if (y === 0) {
        return res.status(400).send("Cannot divide by zero");
      }
      result = x / y;
      break;
    default:
      return res.status(400).send("Unknown operation");
  }

  res.send(String(result));
});

// working with arrays: todos

// GET all todos, optional ?completed=true
app.get("/lab5/todos", (req, res) => {
  const { completed } = req.query;
  if (completed === undefined) {
    return res.json(todos);
  }
  const isCompleted = completed === "true";
  res.json(todos.filter((t) => t.completed === isCompleted));
});

// GET todo by id
app.get("/lab5/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${req.params.id} not found` });
  }
  res.json(todo);
});

// create new todo with default values
app.get("/lab5/todos/create", (req, res) => {
  const newId = String(todos.length + 1);
  const newTodo = {
    id: newId,
    title: `New Todo ${newId}`,
    description: "Newly created todo item",
    completed: false,
  };
  todos.push(newTodo);
  res.json(todos);
});

// delete todo by id
app.get("/lab5/todos/:id/delete", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).send(`Unable to Delete Todo with ID: ${id}`);
  }
  todos.splice(index, 1);
  res.json(todos);
});

// update title
app.get("/lab5/todos/:id/title/:title", (req, res) => {
  const { id, title } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${id} not found` });
  }
  todo.title = title;
  res.json(todos);
});

// update completed flag
app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
  const { id, completed } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${id} not found` });
  }
  todo.completed = completed === "true";
  res.json(todos);
});

// update description
app.get("/lab5/todos/:id/description/:description", (req, res) => {
  const { id, description } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${id} not found` });
  }
  todo.description = description;
  res.json(todos);
});

// async rest-style todos

// POST create todo
app.post("/lab5/todos", (req, res) => {
  const { title, description, completed } = req.body || {};
  const newId = String(todos.length + 1);
  const newTodo = {
    id: newId,
    title: title || `New Todo ${newId}`,
    description: description || "",
    completed: !!completed,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE todo
app.delete("/lab5/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).send(`Unable to Delete Todo with ID: ${id}`);
  }
  const deleted = todos[index];
  todos.splice(index, 1);
  res.json(deleted);
});

// PUT update todo fields
app.put("/lab5/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${id} not found` });
  }

  const { title, description, completed } = req.body || {};
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Kambaz server listening on port", PORT);
});