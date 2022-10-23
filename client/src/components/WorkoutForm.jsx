import { createSignal, onMount, batch, mergeProps } from "solid-js";
import { useNavigate } from "solid-start";
import { post_workout, update_workout } from "~/lib/workouts";
import { useWorkouts } from "~/context/workouts";

const WorkoutForm = props => {
  const merged = mergeProps({ update: null }, props);
  const { addWorkout, updateWorkout } = useWorkouts();
  const [workout, setWorkout] = createSignal({ name: merged.update?.name || "", reps: merged.update?.reps || null, load: merged.update?.load || null });
  const [loading, setLoading] = createSignal(false);
  const [errors, setErrors] = createSignal({
    error: null,
    nameError: null,
    repsError: null,
    loadError: null,
  });
  let inputRef;

  onMount(() => inputRef.select());

  const navigate = useNavigate();

  const updateWorkoutInput = ({ target }) => setWorkout(prev => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = async e => {
    e.preventDefault();

    if (!workout().name || !workout().reps || !workout().load) return;

    try {
      setLoading(true);
      const { errors, error, data } = merged.update ? (await update_workout(merged.update?._id, { name: workout().name, reps: +workout().reps, load: +workout().load })) : (await post_workout({ name: workout().name, reps: +workout().reps, load: +workout().load }));

      if (errors) {
        setErrors(prev => ({ ...prev, ...errors, error }))
      } else {
        if (!merged.update) {
          addWorkout(data);
          return navigate("/workouts");
        } else {
          updateWorkout(merged.update?._id, { name: workout().name, reps: +workout().reps, load: +workout().load });
          return props.onClose();
        }
      }
    } catch (err) {
      console.log(err);
      setErrors(prev => ({ ...prev, error: err.message }));
    } finally {
      batch(() => {
        setLoading(false);
      })
    }
  }

  return <form class="workout-form" classList={{ add: !merged.update }} autocomplete="off" onSubmit={handleSubmit}>
    <h2 class="workout-form-title">{merged.update ? "Edit Workout" : "Add Workout"}</h2>
    <div class="workout-form-group">
      <label class="workout-form-label" htmlFor="name">Name</label>
      <input class="workout-form-input" ref={inputRef} type="text" id="name" name="name" required placeholder="Enter workout name..." onInput={updateWorkoutInput} value={workout().name} />
      <p class="workout-form-error">{errors()?.nameError && errors().nameError}</p>
    </div>
    <div class="workout-form-group">
      <label class="workout-form-label" htmlFor="reps">Reps</label>
      <input class="workout-form-input" type="number" min={0} id="reps" name="reps" required placeholder="Enter workout reps..." onInput={updateWorkoutInput} value={workout().reps} />
      <p class="workout-form-error">{errors()?.repsError && errors().repsError}</p>
    </div>
    <div class="workout-form-group">
      <label class="workout-form-label" htmlFor="load">Load (kg)</label>
      <input class="workout-form-input" type="number" min={0} id="load" name="load" required placeholder="Enter workout load..." onInput={updateWorkoutInput} value={workout().load} />
      <p class="workout-form-error">{errors()?.loadError && errors().loadError}</p>
    </div>
    <p class="workout-form-error">{errors()?.error && errors().error}</p>
    <button disabled={loading() || !workout().name || !workout().reps || !workout().load} class="workout-form-btn">{loading() ? "Loading..." : merged.update ? "Update Workout" : "Add Workout"}</button>
  </form>
}

export default WorkoutForm;