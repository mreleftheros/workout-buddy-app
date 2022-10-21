const Workout = require("../model/Workout");

exports.index_get = async (req, res) => {
  try {
    const result = await Workout.getAll();

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.index_post = async (req, res) => {
  try {
    const { error, errors, data } = Workout.validate(req.body);
    if (error) {
      return res.status(400).json({ error, ...errors });
    }

    const { _id } = await Workout.set(data);

    return res.status(201).json({ _id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_get = async (req, res) => {
  const { id } = req.params;
  try {
    const { idError, result } = await Workout.getById(id);
    if (idError || !result) {
      return res.status(404).json({ error: "Invalid id." });
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_patch = async (req, res) => {
  const { id } = req.params;
  try {
    const { idError, error } = await Workout.update(id, req.body);
    if (idError) {
      return res.status(404).json({ error: "Invalid id." });
    } else if (error) {
      return res.status(400).json({ error: "Invalid data." });
    }

    return res.json("OK");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_delete = async (req, res) => {
  const { id } = req.params;
  try {
    const { idError } = await Workout.deleteById(id);
    if (idError) {
      return res.status(404).json({ error: "Invalid id." });
    }

    return res.json("OK");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};