const express = require("express");
const app = express();
const workoutRouter = require("./routes/workouts");

app.use(express.json());

app.use("/api/workouts", workoutRouter);

module.exports = app;