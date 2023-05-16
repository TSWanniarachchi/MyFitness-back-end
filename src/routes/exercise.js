const express = require("express");
const exerciseRouter = express.Router();
const exerciseModel = require("../models/exercise");

// Insert Exercise Details
exerciseRouter.post("/", async (req, res) => {
  try {
    const exercise = new exerciseModel({
      id: req.body.id,
      name: req.body.name,
      group: req.body.group,
      category: req.body.category,
      difficultyLevel: req.body.difficultyLevel,
      equipment: req.body.equipment,
      targetMuscle: req.body.targetMuscle,
      context: {
        sets: req.body.context.sets,
        reps: req.body.context.reps,
        rest: req.body.context.rest,
        duration: req.body.context.duration,
      },
      burnedCalories: req.body.burnedCalories,
      media: {
        image: req.body.media.image,
        video: req.body.media.video,
      },
      description: req.body.description,
      isActive: req.body.isActive,
      createdDateTime: req.body.createdDateTime,
    });
    const newExercise = await exercise.save();

    res.status(200).send([
      {
        success: true,
        message: "Exercise successfully inserted",
        data: newExercise,
      },
    ]);
  } catch (error) {
    res.status(500).send([
      {
        success: false,
        message: "Error occurred while inserting exercise",
        data: error.message,
      },
    ]);
  }
});

// Get All Exercises
exerciseRouter.get("/", async (req, res) => {
  try {
    const exercises = await exerciseModel.find();

    if (exercises.length === 0) {
      return res.status(404).send([
        {
          success: false,
          message: "No exercises found",
          data: exercises,
        },
      ]);
    }

    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send([
      {
        success: false,
        message: "Error occurred while fetching exercise",
        data: error.message,
      },
    ]);
  }
});

// Get Exercise by ID
exerciseRouter.get("/:id", async (req, res) => {
  try {
    const exercise = await exerciseModel.find({
      id: req.params.id,
    });

    if (exercise.length === 0) {
      return res.status(404).send([
        {
          success: false,
          message: "The given ID does not match any exercise in our system",
          data: exercises,
        },
      ]);
    }

    res.status(200).send(exercise);
  } catch (error) {
    res.status(500).send([
      {
        success: false,
        message: "Error occurred while fetching exercise",
        data: error.message,
      },
    ]);
  }
});

// Get Exercises by Category
exerciseRouter.get("/category/:category", async (req, res) => {
  try {
    const exercises = await exerciseModel.find({
      category: req.params.category,
    });

    if (exercises.length === 0) {
      return res.status(404).send([
        {
          success: false,
          message:
            "Error: The given category does not match any exercises in our system",
          data: exercises,
        },
      ]);
    }

    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send([
      {
        success: false,
        message: "Error occurred while fetching exercise",
        data: error.message,
      },
    ]);
  }
});

module.exports = exerciseRouter;
