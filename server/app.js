const express = require("express");
const app = express();
const cors = require("cors");
const workoutRouter = require("./routes/workouts");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.use("/api/workouts", workoutRouter);
app.use("/api/auth", authRouter);

module.exports = app;