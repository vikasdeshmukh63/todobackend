const router = require("express").Router();
const Task = require("../models/taskModel");
const isAuthenticated = require("../middleware/auth")
const {newTaskController,myTaskController,updateTaskController,deleteTaskController} = require("../controller/taskController")

// new task route 
router.post("/new",isAuthenticated,newTaskController);

// get my task 
router.get("/mytask",isAuthenticated,myTaskController);

// update and delete the task 
router.route("/:id").put(isAuthenticated,updateTaskController).delete(isAuthenticated,deleteTaskController)

module.exports = router