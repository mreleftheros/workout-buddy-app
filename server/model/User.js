const { getCol } = require("../config/db");
const col = getCol("users");
const argon = require("argon2");

class User {
  static validateOnSet(data) {
    let error;
    const errors = {};
    const len = Object.keys(data).length;

    if (len !== 2) {
      error = "Data is missing.";
      return { error };
    }

    if (!("username" in data) || !("password" in data)) {
      error = "Invalid data.";
      return { error };
    }

    if (typeof data.username !== "string" || typeof data.password !== "string") {
      error = "Invalid types.";
      return { error };
    }

    data.username.trim();
    const { username, password } = data;

    if (!username) {
      errors.usernameError = "Must provide username.";
    } else if (username.length < 4) {
      errors.usernameError = "Username must be minimum 4 characters.";
    } else if (username.length > 25) {
      errors.usernameError = "Username too big.";
    }

    if (!password) {
      errors.passwordError = "Must provide password.";
    } else if (password.length < 6) {
      errors.passwordError = "Password must be minimum 6 characters.";
    } else if (password.length > 25) {
      errors.passwordError = "Password too big.";
    }

    if (Object.keys(errors).length > 0) {
      error = "Authentication failed."
    }

    return { error, data: { username, password }, errors };
  }

  static validateOnLogin(data) {
    let error;
    const len = Object.keys(data).length;

    if (len !== 2) {
      error = "Data is missing.";
      return { error };
    }

    if (!("username" in data) || !("password" in data)) {
      error = "Invalid data.";
      return { error };
    }

    if (typeof data.username !== "string" || typeof data.password !== "string") {
      error = "Invalid types.";
      return { error };
    }

    return { error: null };
  }

  static async check(username) {
    return (await col.findOne({ username }));
  }

  static async signup(data) {
    const { username, password } = data;
    const hashedPassword = await argon.hash(password);

    const { acknowledged, insertedId } = await col.insertOne({ username, password: hashedPassword });
    if (!acknowledged) throw new Error("Could not save user to the database");

    return {
      _id: insertedId.toString()
    };
  }

  static async login(data) {
    let error;
    const { username, password } = data;

    const result = await col.findOne({ username });
    if (!result) {
      error = "Wrong credentials.";
      return { error };
    }

    const passwordMatches = await argon.verify(result.password, password);
    if (!passwordMatches) {
      error = "Wrong credentials.";
      return { error };
    }

    return {
      error,
      _id: result._id,
      username: result.username
    };
  }
}

module.exports = User;