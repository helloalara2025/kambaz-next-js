let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithArrays(app) {
  // get all todos, with optional ?completed=true/false filter
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter(
        (t) => t.completed === completedBool
      );
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  };

  // create new todo via GET /create (old lab behavior)
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };

  // get a specific todo by id
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };

  // old remove via GET /:id/delete (kept for earlier exercises)
  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.json(todos);
  };

  // new title update using path params
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  };

  // POST /lab5/todos – JSON body, return only the new todo
  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  // DELETE /lab5/todos/:id – new delete handler
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };

  // routes
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/delete", removeTodo);   // old-style delete
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/:id", getTodoById);

  app.post("/lab5/todos", postNewTodo);            // POST with JSON body
  app.delete("/lab5/todos/:id", deleteTodo);       // proper HTTP DELETE
}