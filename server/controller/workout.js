const Workout = require("../model/Workout");

exports.index_get = async (req, res) => {
  try {
    const result = await Workout.getAll();

    if (!result) return res.status(404).json({ error: "Workouts not found." });

    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.index_post = async (req, res) => {
  try {
    const { error, errors, data } = Workout.validate(req.body);
    if (error) {
      return res.status(400).json({ error, errors });
    }

    data.done = false;

    const result = await Workout.set(data);

    return res.status(201).json({ data: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_get = async (req, res) => {
  const { id } = req.params;
  const valid = Workout.validateId(id);
  if (!valid) return res.status(400).json({ error: "Invalid id." });

  try {
    const result = await Workout.getById(id);
    if (!result) {
      return res.status(404).json({ error: "Workout not found." });
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_patch = async (req, res) => {
  const { id } = req.params;
  const valid = Workout.validateId(id);
  if (!valid) return res.status(400).json({ error: "Invalid id." });

  try {
    const { error, data, errors } = Workout.validateOnUpdate(req.body);
    if (error) {
      return res.status(400).json({ error, ...errors });
    }

    const result = await Workout.update(id, req.body);
    if (result?.error) {
      return res.status(404).json({ ...result });
    }

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_delete = async (req, res) => {
  const { id } = req.params;
  const valid = Workout.validateId(id);
  if (!valid) return res.status(400).json({ error: "Invalid id." });

  try {
    await Workout.deleteById(id);

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};