const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: "title is required" });

  const todo = await Todo.create({ title: title.trim() });
  res.status(201).json(todo);
});

// READ ALL
router.get("/", async (_req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ error: "not found" });
  res.json(todo);
});

// UPDATE (title/done)
router.patch("/:id", async (req, res) => {
  const updates = {};
  if (typeof req.body.title === "string") updates.title = req.body.title.trim();
  if (typeof req.body.done === "boolean") updates.done = req.body.done;

  const todo = await Todo.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!todo) return res.status(404).json({ error: "not found" });
  res.json(todo);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ error: "not found" });
  res.json({ ok: true });
});

module.exports = router;
