// Users/routes.js
import UsersDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function UsersRoutes(app, db) {
  const dao = UsersDao(db);

  //---------------- SIGNUP ----------------//
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  app.post("/api/users/signup", signup);

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res
        .status(401)
        .json({ message: "Unable to login. Try again later." });
    }
  };

  app.post("/api/users/signin", signin);

  //---------------- UPDATE USER ----------------//
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;

    dao.updateUser(userId, userUpdates);

    const updatedUser = dao.findUserById(userId);
    req.session["currentUser"] = updatedUser;
    res.json(updatedUser);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  };

   const enrollmentsDao = EnrollmentsDao(db);
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);
  app.post("/api/users/signout", signout);

  app.get("/api/users/profile", profile);

  app.put("/api/users/:userId", updateUser);

  // keep other existing routes here
}