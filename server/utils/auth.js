const jwt = require("jsonwebtoken");

const TIME_IN_SECONDS = 1 * 24 * 60 * 60;

exports.createToken = (...data) => jwt.sign({ ...data }, process.env.JWT, { expiresIn: TIME_IN_SECONDS });

exports.cookieOptions = {
  maxAge: TIME_IN_SECONDS * 1000,
  secure: process.env.NODE_ENV !== "development",
  httpOnly: true,
  sameSite: "Lax"
};