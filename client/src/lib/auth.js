const baseUrl = "http://localhost:5000/api/auth/";

export const signup_post = async (username, password) => {
  try {
    const res = await fetch(baseUrl + "signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
    const { error, data, errors } = await res.json();
    return { error, data, errors };
  } catch (err) {
    throw err;
  }
};

export const login_post = async (username, password) => {
  try {
    const res = await fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
    const { error, data } = await res.json();
    return { error, data };
  } catch (err) {
    throw err;
  }
};