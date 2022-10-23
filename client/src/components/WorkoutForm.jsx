import { batch } from "solid-js";
import { createSignal, onMount } from "solid-js";
import { post_workout } from "~/api/workouts";
import { useWorkouts } from "~/context/workouts";

const WorkoutForm = props => {
  const { workouts, addWorkout } = useWorkouts();
  const [workout, setWorkout] = createSignal({ name: "", reps: null, load: null });
  const [loading, setLoading] = createSignal(false);
  const [errors, setErrors] = createSignal({
    error: null,
    nameError: null,
    repsError: null,
    loadError: null,
  });
  let inputRef;

  onMount(() => inputRef.focus());

  const updateWorkout = ({ target }) => setWorkout(prev => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = async e => {
    e.preventDefault();

    if (!workout().name || !workout().reps || !workout().load) return;

    try {
      setLoading(true);
      const { errors, error, data } = await post_workout({ name: workout().name, reps: +workout().reps, load: +workout().load });

      if (errors) {
        setErrors(prev => ({ ...prev, ...errors, error }))
      } else if (data) {
        // add data obj to context later
        console.log(data);
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, error: err.message }));
    } finally {
      batch(() => {
        setLoading(false);
        setWorkout({ name: "", reps: null, load: null });
      })
    }
  }

  return <form class="workout-form" autocomplete="off" onSubmit={handleSubmit}>
    <h2 class="workout-form-title">{props.name}</h2>
    <div class="workout-form-group">
      <label class="workout-form-label" htmlFor="name">Name</label>
      <input class="workout-form-input" ref={inputRef} type="text" id="name" name="name" required placeholder="Enter workout name..." onInput={updateWorkout} value={workout().name} />
      <p class="workout-form-error">{errors()?.nameError && errors().nameError}</p>
    </div>
    <div class="workout-form-group">
      <label class="workout-form-label" htmlFor="reps">Reps</label>
      <input class="workout-form-input" type="number" min={0} id="reps" name="reps" required placeholder="Enter workout reps..." onInput={updateWorkout} value={workout().reps} />
      <p class="workout-form-error">{errors()?.repsError && errors().repsError}</p>
    </div>
    <div class="workout-form-group">
      <label class="workout-form-label" htmlFor="load">Load (kg)</label>
      <input class="workout-form-input" type="number" min={0} id="load" name="load" required placeholder="Enter workout load..." onInput={updateWorkout} value={workout().load} />
      <p class="workout-form-error">{errors()?.loadError && errors().loadError}</p>
    </div>
    <p class="workout-form-error">{errors()?.error && errors().error}</p>
    <button disabled={loading() || !workout().name || !workout().reps || !workout().load} class="workout-form-btn">{loading() ? "Adding workout..." : "Add Workout"}</button>
  </form>
}

export default WorkoutForm;