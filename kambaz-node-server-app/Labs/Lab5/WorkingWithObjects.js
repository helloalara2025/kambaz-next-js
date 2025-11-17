
const assignment = {
  title: "NodeJS Assignment",
  score: 95,
  completed: false,
};

const moduleObj = {
  id: "M01",
  name: "NodeJS Module",
  description: "Introduction to Node.js and Express",
  course: "CS5610",
};

export default function WorkingWithObjects(app) {
  // --- ASSIGNMENT ROUTES ---

  // Get full assignment object
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  // Get just the assignment title
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  // Update assignment title (using path parameter)
  app.get("/lab5/assignment/title/:title", (req, res) => {
    const { title } = req.params;
    assignment.title = title;
    res.json(assignment);
  });

  // --- MODULE ROUTES ---

  // Get full module object
  app.get("/lab5/module", (req, res) => {
    res.json(moduleObj);
  });

  // Get just the module name
  app.get("/lab5/module/name", (req, res) => {
    res.json(moduleObj.name);
  });

  // Update module name (nice for the “On Your Own” part)
  app.get("/lab5/module/name/:name", (req, res) => {
    const { name } = req.params;
    moduleObj.name = name;
    res.json(moduleObj);
  });
}