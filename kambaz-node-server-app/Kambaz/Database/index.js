import { createRequire } from "module";
const require = createRequire(import.meta.url);

const db = {
  courses: require("./courses.json"),
  assignments: require("./assignments.json"),
  modules: require("./modules.json"),
  users: require("./users.json"),
  enrollments: require("./enrollments.json"),
};

export default db;