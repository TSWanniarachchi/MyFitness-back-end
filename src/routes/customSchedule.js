const express = require("express");
const async = require("async");
const customScheduleRouter = express.Router();
const customScheduleModel = require("../models/customSchedule");
const exerciseModel = require("../models/exercise");

// Insert custom schedule exercise
customScheduleRouter.post("/", async (req, res) => {
  try {
    //Check mandatory value userId
    if (!req.body.userId) {
      return res.status(400).send([
        {
          success: false,
          message: "UserId is required",
          data: "",
        },
      ]);
    }

    //Check mandatory value exerciseId
    if (!req.body.exerciseId) {
      return res.status(400).send([
        {
          success: false,
          message: "ExerciseId is required",
          data: "",
        },
      ]);
    }

    // Check if exercise is already added
    const existExercise = await customScheduleModel.findOne({
      userId: req.body.userId,
      exerciseId: req.body.exerciseId,
    });

    if (existExercise) {
      return res.status(400).send([
        {
          success: false,
          message: "This Exercise is alredy added",
          data: "",
        },
      ]);
    }

    //Insert custom schedule exercise data
    const customScheduleExercise = new customScheduleModel({
      userId: req.body.userId,
      exerciseId: req.body.exerciseId,
    });
    const newCustomScheduleExercise = await customScheduleExercise.save();

    res.status(200).send([
      {
        success: true,
        message: "Successfully Inserted",
        data: newCustomScheduleExercise,
      },
    ]);
  } catch (error) {
    res.status(500).send([
      {
        success: false,
        message: "Error occurred while inserting new custom schedule exercise",
        data: error.message,
      },
    ]);
  }
});

// Get custom schedule exercise by user id
customScheduleRouter.get("/:userId", async (req, res) => {
  try {
    const customScheduleExercises = await customScheduleModel
      .find({
        userId: req.params.userId,
      })
      .sort({
        createdDateTime: "desc",
      });

    if (customScheduleExercises.length === 0) {
      return res.status(404).send([
        {
          success: false,
          message:
            "The given user does not match any custom schedule exercises on our system",
          data: "",
        },
      ]);
    }

    //If has user wise custom schedule exercises, then get exercise details
    const customSchedule = await async.map(
      customScheduleExercises,
      async (exercise) => {
        return await exerciseModel.findOne({ id: exercise.exerciseId }).select({
          id: 1,
          name: 1,
          group: 1,
          category: 1,
          equipment: 1,
          difficultyLevel: 1,
          targetMuscle: 1,
          context: 1,
          burnedCalories: 1,
          media: 1,
          description: 1,
        });
      }
    );

    if (!customSchedule) {
      return res.status(404).send([
        {
          success: false,
          message:
            "The given exercise Id by custom schedule but, does not match any exercise on our system",
          data: "",
        },
      ]);
    }

    res.status(200).send(customSchedule);
  } catch (error) {
    res.status(500).send([
      {
        success: false,
        message:
          "Error occurred while fetching custom schedule exercises by user",
        data: error.message,
      },
    ]);
  }
});

// Delete custom schedule exercise by userId & exerciseId
customScheduleRouter.delete("/:userId/:exerciseId", async (req, res) => {
  try {
    //Check if exercise alredy added in the user's custom schedule
    const existExercise = await customScheduleModel.findOne({
      userId: req.params.userId,
      exerciseId: req.params.exerciseId,
    });

    if (!existExercise) {
      return res.status(404).send([
        {
          success: false,
          message: "The custom schedule exercise does not exist",
          data: "",
        },
      ]);
    }

    //Delete custom schedule exercise
    const deletedExercise = await customScheduleModel.findOneAndDelete({
      userId: req.params.userId,
      exerciseId: req.params.exerciseId,
    });

    res.status(200).send([
      {
        success: true,
        message: "Successfully Deleted",
        data: deletedExercise,
      },
    ]);
  } catch (error) {
    res.status(500).send([
      {
        success: false,
        message:
          "Error occurred while deleting custom schedule exercises by user",
        data: error.message,
      },
    ]);
  }
});

module.exports = customScheduleRouter;
