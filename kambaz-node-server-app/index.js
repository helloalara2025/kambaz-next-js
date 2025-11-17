// kambaz-node-server-app/Labs/Lab5/index.js
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import express from "express";
import WorkingWithObjects from "./WorkingWithObjects.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import db from "./Kambaz/Database/index.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";


const app = express();

// in-memory todos array
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

// basic session configuration, values come from .env when available
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

// in production, trust proxy and configure secure cookies for remote server
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));

// parse JSON bodies for the routes below
app.use(express.json());

// wire up Kambaz API routes
UserRoutes(app, db);
CourseRoutes(app, db);

// Lab 5 object routes
WorkingWithObjects(app);

app.get("/lab5/welcome", (req, res) => {
  res.send("Welcome to Lab 5!");
});

// -----------------------------
// 5.2.2 Path Parameters (add/sub/mul/div)
// -----------------------------
app.get("/lab5/add/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send((a + b).toString());
});

app.get("/lab5/subtract/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send((a - b).toString());
});

app.get("/lab5/multiply/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  res.send((a * b).toString());
});

app.get("/lab5/divide/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  if (b === 0) {
    res.status(400).send("Cannot divide by zero");
    return;
  }
  res.send((a / b).toString());
});

// -----------------------------
// 5.2.2 Query Parameters - Calculator
// -----------------------------
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

  res.send(result.toString());
});

// -----------------------------
// 5.2.4 Working with Arrays (Todos)
// -----------------------------

// GET /lab5/todos
// optional ?completed=true filter
app.get("/lab5/todos", (req, res) => {
  const { completed } = req.query;

  if (completed === undefined) {
    return res.json(todos);
  }

  const completedBool = completed === "true";
  const filtered = todos.filter((t) => t.completed === completedBool);
  res.json(filtered);
});

// GET /lab5/todos/:id
app.get("/lab5/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${id} not found` });
  }
  res.json(todo);
});

// GET /lab5/todos/create
// creates a new default todo
app.get("/lab5/todos/create", (req, res) => {
  const newId = (todos.length + 1).toString();
  const newTodo = {
    id: newId,
    title: `New Todo ${newId}`,
    description: "Newly created todo item",
    completed: false,
  };
  todos.push(newTodo);
  res.json(todos);
});

// GET /lab5/todos/:id/delete
app.get("/lab5/todos/:id/delete", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).send(`Unable to Delete Todo with ID: ${id}`);
  }

  todos.splice(index, 1);
  res.json(todos);
});

// GET /lab5/todos/:id/title/:title  (update title)
app.get("/lab5/todos/:id/title/:title", (req, res) => {
  const { id, title } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${id} not found` });
  }
  todo.title = title;
  res.json(todos);
});

// ON YOUR OWN:
// GET /lab5/todos/:id/completed/:completed  (update completed)
app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
  const { id, completed } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${id} not found` });
  }

  todo.completed = completed === "true";
  res.json(todos);
});

// GET /lab5/todos/:id/description/:description  (update description)
app.get("/lab5/todos/:id/description/:description", (req, res) => {
  const { id, description } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: `Todo ${id} not found` });
  }

  todo.description = description;
  res.json(todos);
});

// -----------------------------
// 5.2.5 Async / REST-style Todos
// POST / DELETE / PUT
// -----------------------------

// POST /lab5/todos  (create from JSON body)
app.post("/lab5/todos", (req, res) => {
  const { title, description, completed } = req.body || {};
  const newId = (todos.length + 1).toString();

  const newTodo = {
    id: newId,
    title: title || `New Todo ${newId}`,
    description: description || "",
    completed: !!completed,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE /lab5/todos/:id
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

app.listen(process.env.PORT || 4000, () => {
  console.log("Kambaz server listening on port", process.env.PORT || 4000);
});

import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
AssignmentsRoutes(app, db);

UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentsRoutes(app, db);
WorkingWithObjects(app);
