import init_db, { Todo } from "./Models.js";
import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

init_db();

app.get("/", async (req, res) => {
  const todos = await Todo.findAll({});
  return res.send(todos);
});

app.post("/", async (req, res) => {
  const new_todo = await Todo.create({
    title: req.body.title,
    children: req.body.children,
  });
  return res.send("Received a POST HTTP method");
});

app.put("/sub", async (req, res) => {
  const todo = await Todo.findOne({ where: { id: req.body.id } });
  if (!todo) {
    return res.send(404);
  }

  todo.children = [...todo.children, req.body.new_sub];
  await todo.save();
  return res.send(todo);
});

app.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
