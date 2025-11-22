import { createRequire } from "module"; // helper to use require in esm
const require = createRequire(import.meta.url); // connect require to this file

// load json files
const db = {
  courses: require("./courses.json"),
  assignments: require("./assignments.json"),
  modules: require("./modules.json"),
  users: require("./users.json"),
  enrollments: require("./enrollments.json"),
};

export default db;