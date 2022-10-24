const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "No authentication token found." });
    }

    const token = authorization.split("Bearer ")[1];

    const verified = jwt.verify(token, process.env.JWT);

    const result = await User.getById(verified["0"]);
    if (!result) {
      return res.status(404).json({ error: "User not found." });
    }

    req.userId = result._id.toString();
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}