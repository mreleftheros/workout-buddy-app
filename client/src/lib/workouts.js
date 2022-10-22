export const fetchWorkouts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/workouts");
    return await res.json();
  } catch (err) {
    throw err;
  }
}