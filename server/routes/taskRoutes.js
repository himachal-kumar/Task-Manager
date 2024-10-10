import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
  TaskData,
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

// Task creation and duplication routes
router.post("/create",  createTask);
router.post("/duplicate/:id", isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

// Fetching tasks and task data routes
router.get("/dashboard", protectRoute, dashboardStatistics);

router.get("/totaltask", TaskData);
router.get("/", getTasks);
router.get("/:id", getTask);

// Subtask creation and task update routes
router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", isAdminRoute, updateTask);
router.put("/trash/:id", protectRoute, isAdminRoute, trashTask);

// Task delete and restore route
router.delete("/delete-restore/:id", isAdminRoute, deleteRestoreTask);

export default router;

