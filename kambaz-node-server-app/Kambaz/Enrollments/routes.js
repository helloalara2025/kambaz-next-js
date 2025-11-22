import * as dao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  // get current user's enrollments
  app.get("/api/enrollments/current", (req, res) => {
    if (!req.session.currentUser)
      return res.status(401).send("Not logged in");
    const userId = req.session.currentUser._id;
    const enrolled = dao.findEnrollmentsForUser(userId);
    res.send(enrolled);
  });

  // enroll in a course
  app.post("/api/courses/:cid/enroll", (req, res) => {
    if (!req.session.currentUser)
      return res.status(401).send("Not logged in");
    const userId = req.session.currentUser._id;
    const courseId = req.params.cid;
    const data = dao.enrollUserInCourse(userId, courseId);
    res.send(data);
  });

  // unenroll from a course
  app.post("/api/courses/:cid/unenroll", (req, res) => {
    if (!req.session.currentUser)
      return res.status(401).send("Not logged in");
    const userId = req.session.currentUser._id;
    const courseId = req.params.cid;
    const data = dao.unenrollUserFromCourse(userId, courseId);
    res.send(data);
  });
}