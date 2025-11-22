// kambaz-node-server-app/Kambaz/Courses/routes.js
import CoursesDao from "./dao.js";

export default function CoursesRoutes(app, db) {
  const dao = CoursesDao(db);

  // GET /api/courses  – list all courses
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.json(courses);
  };

  // POST /api/courses  – create a course
  const createCourse = (req, res) => {
    const newCourse = dao.createCourse(req.body);
    res.json(newCourse);
  };

  // PUT /api/courses/:courseId  – update a course
  const updateCourse = (req, res) => {
    const courseId = req.params.courseId;
    const updates = req.body;
    const updatedCourse = dao.updateCourse(courseId, updates);
    res.json(updatedCourse);
  };

  // DELETE /api/courses/:courseId  – delete a course
  const deleteCourse = (req, res) => {
    const courseId = req.params.courseId;
    dao.deleteCourse(courseId);
    res.sendStatus(200);
  };

  // wire up endpoints
  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
}