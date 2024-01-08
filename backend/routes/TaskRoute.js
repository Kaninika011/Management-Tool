const {Router} = require("express");

const {getTasks, saveTask, deleteTask, updateTask, toggleTaskStatus} = require("../controllers/TaskControllers");

const router = Router();

router.get("/get", getTasks);
router.post("/save", saveTask);
router.put("/update/:id", updateTask);
router.put("/toggle/:id", toggleTaskStatus);
router.delete("/delete/:id", deleteTask);

module.exports = router;

