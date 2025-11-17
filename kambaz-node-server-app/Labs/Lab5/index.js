// kambaz-node-server-app/index.js
import express from "express";
import cors from "cors";
import Lab5 from "./Labs/Lab5/index.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

Lab5(app); // plug in all the Lab 5 routes
UserRoutes(app, db); // plug in all the User routes

app.listen(4000, () => {
  console.log("HTTP server listening on http://localhost:4000");
});