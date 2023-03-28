import { useWorkoutContext } from "~/context/workouts";
import Modal from "~/components/Modal";
import { createSignal } from "solid-js";
import WorkoutForm from "~/components/WorkoutForm";
import { useAuthContext } from "~/context/auth";
import { useNavigate } from "solid-start";
import { A } from "solid-start";
import { CgToggleOff, CgToggleOn } from "solid-icons/cg";
import { FiEdit } from "solid-icons/fi";

const index = () => {
  const { workouts, deleteWorkout, toggleWorkout } = useWorkoutContext();
  const [update, setUpdate] = createSignal(null);
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  if (!auth()) {
    return navigate("/login");
  }

  const handleDelete = async id => {
    try {
      const ok = await deleteWorkout(id);
      if (!ok) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleToggle = async ({ id, done }) => {
    try {
      const ok = await toggleWorkout(id, done);
      if (!ok) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = w => setUpdate(w);

  const resetUpdate = () => setUpdate(null);

  return (
    <section className="workouts">
      <h1 class="workouts-title">My Workouts List</h1>
      <Show when={update()}>
        <Modal onClose={resetUpdate}>
          <WorkoutForm update={update()} onClose={resetUpdate} />
        </Modal>
      </Show>
      <Switch
        fallback={
          <>
            <p class="workouts-fallback">
              They are currently no workouts added.
            </p>
            <A class="workouts-link" href="/workouts/add">
              New Workout
            </A>
          </>
        }
      >
        <Match when={workouts.loading}>
          <div class="workouts-loading">
            <span class="loader loader-l"></span>
          </div>
        </Match>
        <Match when={workouts.error}>
          {err => <p class="workouts-error">{err.message}</p>}
          <p>
            Please{" "}
            <button class="workouts-error-btn" onClick={refetch}>
              Try again
            </button>{" "}
            or contact the developer to fix the issue.
          </p>
        </Match>
        <Match when={workouts()?.length > 0}>
          <ul class="workouts-list">
            <For each={workouts()}>
              {w => (
                <li class="workouts-item" classList={{ done: w?.done }}>
                  <div class="workouts-item-details">
                    <h2 class="workouts-item-name">{w?.name}</h2>
                    <h2 class="workouts-item-reps">{w?.reps}</h2>
                    <h2 class="workouts-item-load">{w?.load}kg</h2>
                  </div>
                  <div className="workouts-item-tools">
                    <button
                      onClick={[handleToggle, { id: w._id, done: !w.done }]}
                      class="workouts-item-tool toggle"
                    >
                      {w?.done ? <CgToggleOff color="green" /> : <CgToggleOn color="black" />}
                    </button>
                    <button
                      onClick={[handleEdit, w]}
                      class="workouts-item-tool edit"
                    >
                      <FiEdit color="black" />
                    </button>
                    <button
                      onClick={[handleDelete, w._id]}
                      class="workouts-item-tool trash"
                    >
                      🗑
                    </button>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </Match>
      </Switch>
    </section>
  );
};

export default index;
