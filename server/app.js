const express = require("express");
const app = express();
const cors = require("cors");
const workoutRouter = require("./routes/workouts");

app.use(express.json());
app.use(cors());

app.use("/api/workouts", workoutRouter);

module.exports = app;