export const get_workouts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/workouts");
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const post_workout = async (obj) => {
  try {
    const res = await fetch("http://localhost:5000/api/workouts", {
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
}

export const delete_workout = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "DELETE"
    });
    return true;
  } catch (err) {
    throw err;
  }
}