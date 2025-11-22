import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const list = dao.findAssignmentsForCourse(cid);
    res.json(list);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignment = dao.createAssignment(cid, req.body);
    res.status(201).json(assignment);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const updated = dao.updateAssignment(aid, req.body);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.json(updated);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const ok = dao.deleteAssignment(aid);
    if (!ok) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  });
}