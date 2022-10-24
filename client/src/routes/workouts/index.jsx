import { delete_workout, toggle_workout } from "~/lib/workouts";
import { useWorkouts } from "~/context/workouts";
import Modal from "~/components/Modal";
import { createSignal } from "solid-js";
import WorkoutForm from "~/components/WorkoutForm";
import { useAuth } from "~/context/auth";
import { useNavigate } from "solid-start";

const index = () => {
  const { workouts, deleteWorkout, toggleWorkout } = useWorkouts();
  const [update, setUpdate] = createSignal(null);
  const { auth } = useAuth();

  const navigate = useNavigate();

  if (!auth()) {
    return navigate("/login");
  }

  const handleDelete = async id => {
    try {
      const ok = await delete_workout(id);
      if (ok) {
        deleteWorkout(id);
      }
    } catch (err) {
      return; //
    }
  };

  const handleToggle = async ({ id, done }) => {
    try {
      const ok = await toggle_workout(id, done);
      if (ok) {
        return toggleWorkout(id);
      }
    } catch (err) {
      return; //
    }
  };

  const handleEdit = w => setUpdate(w);

  const resetUpdate = () => setUpdate(null);

  return <section className="workouts">
    <h1 class="workouts-title">Workouts List</h1>
    <Show when={update()}>
      <Modal onClose={resetUpdate}>
        <WorkoutForm update={update()} onClose={resetUpdate} />
      </Modal>
    </Show>
    <Switch fallback={<p class="workouts-fallback">They are currently no workouts added.</p>}>
      <Match when={workouts.loading}>
        <p class="workouts-loading">Loading...</p>
      </Match>
      <Match when={workouts.error}>
        <p class="workouts-error">There was some error</p>
        {workouts.error}
        <p>Please <button class="workouts-error-btn" onClick={refetch}>Try again</button> or contact the developer to fix the issue.</p>
      </Match>
      <Match when={workouts()?.length > 0}>
        <ul class="workouts-list">
          <li class="workouts-item">
            <div class="workouts-item-details">
              <h2 class="workouts-item-name">Name</h2>
              <h2 class="workouts-item-reps">Reps</h2>
              <h2 class="workouts-item-load">Load</h2>
            </div>
            <div className="workouts-item-tools"></div>
          </li>
          <For each={workouts()}>
            {w => (
              <li class="workouts-item" classList={{ done: w?.done }}>
                <div class="workouts-item-details">
                  <h2 class="workouts-item-name">{w?.name}</h2>
                  <h2 class="workouts-item-reps">{w?.reps}</h2>
                  <h2 class="workouts-item-load">{w?.load}kg</h2>
                </div>
                <div className="workouts-item-tools">
                  <button onClick={[handleToggle, { id: w._id, done: !w.done }]} class="workouts-item-tool toggle">{w?.done ? "❌" : "☑"}</button>
                  <button onClick={[handleEdit, w]} class="workouts-item-tool edit">🖊</button>
                  <button onClick={[handleDelete, w._id]} class="workouts-item-tool trash">🗑</button>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Match>
    </Switch>
  </section >;
};

export default index;