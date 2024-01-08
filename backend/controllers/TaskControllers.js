const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.send(tasks);
};





module.exports.saveTask = (req, res) => {
  const { task, body, status } = req.body;
  if (!task) {
    return res.status(400).send({ error: 'Title is required', msg: 'Please provide a title.' });
  }
  TaskModel.create({  task, body, status })
    .then((data) => {
      console.log("Saved Successfully");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: 'Something went wrong' });
    });
};

module.exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { task,body,status } = req.body;
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


module.exports.deleteTask = (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted Successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};
