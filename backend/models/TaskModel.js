const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema ({
    task:{
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "pending", 
      },
    });

module.exports = mongoose.model("Task", taskSchema);