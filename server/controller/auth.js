const User = require("../model/User");
const { createToken } = require("../utils/auth");

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

    const token = createToken(_id);

    return res.status(201).json({ data: { _id, username: data.username, token } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

exports.login_post = async (req, res) => {
  try {
    const { error } = User.validateOnLogin(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const { error: loginError, _id, username } = await User.login(req.body);
    if (loginError) {
      return res.status(404).json({ error: loginError });
    }

    const token = createToken(_id);

    return res.json({ data: { _id, username, token } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}