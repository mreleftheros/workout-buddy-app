const baseUrl = "http://localhost:5000/api/workouts/";

export const get_workouts = async () => {
  try {
    const res = await fetch(baseUrl);
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const post_workout = async (obj) => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const { error, errors, data } = await res.json();

    return { error, errors, data };
  } catch (err) {
    throw err;
  }
};

export const delete_workout = async (id) => {
  try {
    const res = await fetch(`${baseUrl}${id}`, {
      method: "DELETE"
    });
    if (res.ok) return true;
  } catch (err) {
    throw err;
  }
};

export const toggle_workout = async (id, done) => {
  try {
    const res = await fetch(`${baseUrl}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ done })
    });
    if (res.ok) return true;
  } catch (err) {
    throw err;
  }
};

export const update_workout = async (id, obj) => {
  try {
    const res = await fetch(`${baseUrl}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const {error, data, errors} = await res.json();

    return {error, data, errors};
  } catch (err) {
    throw err;
  }
};