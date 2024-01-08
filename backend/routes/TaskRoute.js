const {Router} = require("express");

// Import the controller functions for handling tasks
const {getTasks, saveTask, deleteTask, updateTask, toggleTaskStatus} = require("../controllers/TaskControllers");

const router = Router(); //instance of Express Router

// Define routes and associate them with the corresponding controller functions

router.get("/get", getTasks);
router.post("/save", saveTask);
router.put("/update/:id", updateTask);
router.put("/toggle/:id", toggleTaskStatus);
router.delete("/delete/:id", deleteTask);

module.exports = router;

