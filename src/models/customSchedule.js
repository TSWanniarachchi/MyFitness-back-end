const mongoose = require("mongoose");

// Custom Schedule Schema
const customScheduleSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    exerciseId: { type: String, required: true },
    createdDateTime: { type: Date, default: Date.now() },
  },
  { collection: "custom-schedules" } // Specify the collection name explicitly
);

// Create an instance of model Custom Schedule
const CustomSchedule = mongoose.model("CustomSchedule", customScheduleSchema);

module.exports = CustomSchedule;
