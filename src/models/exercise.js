const mongoose = require("mongoose");

// Context Field Schema
const contextFieldSchema = mongoose.Schema(
  {
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    rest: { type: Number, required: false },
    duration: { type: Number, required: true },
  },
  { _id: false }
);

// Media Field Schema
const mediaFieldSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    video: { type: String, required: false },
  },
  { _id: false }
);

// Exercise Schema
const exerciseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, minlength: 5 },
    category: { type: String, required: true },
    equipment: { type: String, required: true },
    difficultyLevel: { type: Number, required: true },
    targetMuscle: { type: Array, required: true, default: [] },
    context: contextFieldSchema,
    burnedCalories: { type: Number, required: true },
    media: mediaFieldSchema,
    description: { type: String, required: false, maxlength: 250 },
    isActive: { type: Boolean, required: true, default: true },
    createdDateTime: { type: Date, default: Date.now() },
  },
  { collection: "exercises" } // Specify the collection name explicitly
);

// Create an instance of model Exercise
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
