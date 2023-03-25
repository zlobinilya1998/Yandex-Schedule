import express from "express";
import record from "./api/record";
import specific from "./api/specific";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/record", (req, res) => record(req, res));
app.post("/specific", (req, res) => specific(req, res));

app.listen(port, () => console.log("app listening on port ", port));

export default app;
