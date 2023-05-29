const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, unique: true, required: true, minlength: 5 },
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    difficultyLevel: { type: Number, required: true },
    steps: { type: Number, required: true },
    burnedCalories: { type: Number, required: true },
    progressLevel: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
    createdDateTime: { type: Date, default: Date.now() },
  },
  { collection: "users" } // Specify the collection name explicitly
);

// Create an instance of model User
const User = mongoose.model("User", userSchema);

module.exports = User;
