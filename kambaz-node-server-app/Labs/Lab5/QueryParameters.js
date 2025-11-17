export default function QueryParameters(app) {
  app.get("/lab5/calculator", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const op = req.query.operation;

    let result = 0;

    switch (op) {
      case "add": result = a + b; break;
      case "subtract": result = a - b; break;
      case "multiply": result = a * b; break;
      case "divide": result = a / b; break;
    }

    res.send(result.toString());
  });
}