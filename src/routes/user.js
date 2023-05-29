const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user");

// Get User by username
userRouter.get("/:username", async (req, res) => {
  try {
    const user = await userModel.find({
      username: req.params.username,
    });

    if (user.length === 0) {
      return res.status(404).send([
        {
          success: false,
          message: "The given username does not match any user in our system",
          data: user,
        },
      ]);
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send([
      {
        success: false,
        message: "Error occurred while user details",
        data: error.message,
      },
    ]);
  }
});

module.exports = userRouter;
