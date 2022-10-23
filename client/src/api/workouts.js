export const get_workouts = async () => {
  console.log("fetching workouts...");
  return (await fetch("http://localhost:5000/api/workouts")).json();
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

    console.log(res);

    if (!res.ok) throw new Error("Request failed.");

    const { error, errors, data } = await res.json();

    if (errors) {
      return { errors, error };
    } else if (error) {
      throw error;
    }

    return { data };
  } catch (err) {
    throw err;
  }
}