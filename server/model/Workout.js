const { getCol, isValid, getId } = require("../config/db");
const col = getCol("workouts");

class Workout {
  static validateOnSet(data) {
    let error = "";
    const errors = {}
    const len = Object.keys(data).length;

    if (len !== 3 || (!("name" in data) || !("reps" in data) || !("load" in data))) {
      error = "Invalid data.";
      return { error, errors, data };
    } else if (typeof data.name !== "string" || typeof data.reps !== "number" || typeof data.load !== "number") {
      error = "Types mismatch.";
    }

    if (error) {
      return { error, errors, data };
    }

    data.name.trim();
    let nameLen = data.name.length;

    if (!data.name) {
      errors.nameError = "Must provide name.";
    } else if (nameLen < 2) {
      errors.nameError = "Name too small."
    } else if (nameLen > 25) {
      errors.nameError = "Name too big.";
    }

    if (data.reps < 0) {
      errors.repsError = "Cannot be negative."
    } else if (data.reps > 250) {
      errors.repsError = "Number too high.";
    }

    if (data.load < 0) {
      errors.loadError = "Cannot be negative."
    } else if (data.load > 250) {
      errors.loadError = "Number too high.";
    }

    if (Object.keys(errors).length > 0) {
      error = "Data Validation failed.";
    }

    return { errors, error, data };
  }

  static async set(data) {
    const { insertedId, acknowledged } = await col.insertOne(data);

    if (!acknowledged) throw Error("Could not save workout to the database.");

    return { _id: insertedId.toString(), ...data };
  }

  static async getAll() {
    return col.find()?.toArray();
  }

  static async getById(id) {
    const result = await col.findOne({ _id: getId(id) });
    return result;
  }

  static validateOnUpdate(data) {
    let error = "";
    
    if ("name" in data && "reps" in data && "load" in data) {
      const result = this.validateOnSet(data);
      return result;
    } else if (Object.keys(data).length === 1 && "done" in data) {
      if (typeof data.done !== "boolean") {
        error = "Invalid type.";
      }
    } else {
      error = "Invalid data.";
    }
    return { error, data };
  }

  static validateId(id) {
    return isValid(id);
  }

  static async update(id, data) {
    const result = await col.findOne({ _id: getId(id) });
    if (!result) return { error: "Id not found." };

    const { acknowledged } = await col.updateOne({ _id: getId(id) }, { $set: data });

    if (!acknowledged) throw Error("Could not update workout to the database.");

    return result;
  }

  static async deleteById(id) {
    const { acknowledged } = await col.deleteOne({ _id: getId(id) });
    if (!acknowledged) throw Error("Could not delete workout from the database.");

    return;
  }
}

module.exports = Workout;