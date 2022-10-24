const User = require("../model/User");

exports.signup_post = async (req, res) => {
  try {
    const { error, data, errors } = User.validateOnSet(req.body);
    if (error) {
      return res.status(400).json({ error, errors });
    }

    const exists = await User.check(data.username);
    if (exists) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const { _id } = await User.signup(data);

    return res.status(201).json({ _id, username: data.username });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

exports.login_post = async (req, res) => {
  res.json("LOGIN");
}