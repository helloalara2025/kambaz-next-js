import UsersDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function UsersRoutes(app, db) {
  const dao = UsersDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  // signup
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

  // signin
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);

    if (!currentUser) {
      res
        .status(401)
        .json({ message: "Unable to login. Try again later." });
      return;
    }

    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signin", signin);

  // profile
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  app.get("/api/users/profile", profile);

  // update user
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    dao.updateUser(userId, updates);
    const updatedUser = dao.findUserById(userId);
    req.session["currentUser"] = updatedUser;
    res.json(updatedUser);
  };
  app.put("/api/users/:userId", updateUser);

  // signout
  const signout = (req, res) => {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  };
  app.post("/api/users/signout", signout);
}

