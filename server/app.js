const express = require("express");
const app = express();
const cors = require("cors");
const workoutRouter = require("./routes/workouts");

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use("/api/workouts", workoutRouter);

module.exports = app;