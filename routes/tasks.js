// routes/tasks.js
const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a task
router.post("/", auth, createTask);

// Get all tasks for a user
router.get("/", auth, getTasks);

// Update a task
router.put("/:id", auth, updateTask);

// Delete a task
router.delete("/:id", auth, deleteTask);

module.exports = router;
