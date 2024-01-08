const mongoose = require("mongoose");

// Define a Mongoose schema for the task
const taskSchema = new mongoose.Schema({
  // Task title field
  task: {
    type: String,
    required: true, // Title is a required field
  },
  // Task body/description field
  body: {
    type: String,
    required: false, // Description is an optional field
  },
  // Task status field with default value "pending"
  status: {
    type: String,
    default: "pending", // Default status is "pending"
  },
});

// Export the Mongoose model named "Task" with the defined schema
module.exports = mongoose.model("Task", taskSchema);
