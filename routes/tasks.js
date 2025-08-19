import express from "express";
import Task from "../models/Task.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

router.post("/", authMiddleware, async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: false,
    user: req.user.id
  });
  await newTask.save();
  res.json(newTask);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Tarea eliminada" });
});

router.put("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { completed: req.body.completed },
    { new: true }
  );
  res.json(task);
});

export default router;