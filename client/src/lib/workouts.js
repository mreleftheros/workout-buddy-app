const baseUrl = "https://flying-vigorous-cicada.glitch.me/api/workouts/";

export const get_workouts = async (auth) => {
  try {
    const res = await fetch(baseUrl, {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const post_workout = async (token, obj) => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    });
    const { error, errors, data } = await res.json();

    return { error, errors, data };
  } catch (err) {
    throw err;
  }
};

export const delete_workout = async (token, id) => {
  try {
    const res = await fetch(`${baseUrl}${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    if (res.ok) return true;
  } catch (err) {
    throw err;
  }
};

export const toggle_workout = async (token, id, done) => {
  try {
    const res = await fetch(`${baseUrl}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ done })
    });
    if (res.ok) return true;
  } catch (err) {
    throw err;
  }
};

export const update_workout = async (token, id, obj) => {
  try {
    const res = await fetch(`${baseUrl}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    });
    const { error, data, errors } = await res.json();

    return { error, data, errors };
  } catch (err) {
    throw err;
  }
};