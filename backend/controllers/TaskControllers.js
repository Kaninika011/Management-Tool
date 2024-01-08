const TaskModel = require("../models/TaskModel");

// Controller function to get all tasks
module.exports.getTasks = async (req, res) => {
 
  const tasks = await TaskModel.find();
  
  res.send(tasks);
};

// Controller function to save a new task
module.exports.saveTask = (req, res) => {
 
  const { task, body, status } = req.body;
  
  
  if (!task) {
    return res.status(400).send({ error: 'Title is required', msg: 'Please provide a title.' });
  }

  // Create a new task using the TaskModel
  TaskModel.create({ task, body, status })
    .then((data) => {
      console.log("Saved Successfully");

      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      
      res.status(500).send({ error: err, msg: 'Something went wrong' });
    });
};

// Controller function to update an existing task
module.exports.updateTask = (req, res) => {
  
  const { id } = req.params;
  const { task, body, status } = req.body;

 
  if (!task) {
    return res.status(400).send({ error: 'Title is required', msg: 'Please provide a title.' });
  }


  TaskModel.findByIdAndUpdate(id, { task, body, status })
    .then(() => res.send("Updated Successfully"))
    .catch((err) => {
      console.log(err);
     
      res.send({ error: err, msg: "Something went wrong" });
    });
};

// Controller function to toggle the status of a task (done/pending)
module.exports.toggleTaskStatus = (req, res) => {
  
  const { id } = req.params;

  
  TaskModel.findById(id)
    .then((task) => {
      task.status = task.status === "pending" ? "done" : "pending";
      return task.save();
    })
    .then(() => res.send("Toggled Status Successfully"))
    .catch((err) => {
      console.log(err);
      
      res.send({ error: err, msg: "Something went wrong" });
    });
};

// Controller function to delete a task by ID
module.exports.deleteTask = (req, res) => {
  
  const { id } = req.params;

  
  TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted Successfully"))
    .catch((err) => {
      console.log(err);
      
      res.send({ error: err, msg: "Something went wrong" });
    });
};
